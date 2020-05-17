import * as React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import {
  makeStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  ExpansionPanelActions,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import HeaderContainer from 'components/HeaderContainer'
import RoundResult from 'components/RoundResult'
import MedalTable from 'components/MedalTable'

import { loadAll as loadAllHistory } from 'modules/round'
import { RootState } from 'modules/reducer'

import type { Course as CourseType } from 'common/types/models'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    paddingTop: 60,
    overflowY: 'scroll',
  },
  main: {
    height: '100%',
    marginTop: 5,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
  },
  expansion: {
    margin: '5px 10px',
  },
  border: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 3,
    marginBottom: 5,
  },
  footer: {
    width: '100%',
    padding: 10,
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
  },
  date: {
    color: theme.palette.grey[700],
  },
  toTop: {
    marginTop: 10,
  },
  dialogFieldName: {
    fontSize: 18,
  },
}))
const HistoryPage = (props) => {
  const { removeHistory = () => null } = props
  const classes = useStyles()
  const router = useRouter()
  const [removeIndex, setRemoveIndex] = React.useState(-1)
  const rounds = useSelector((state: RootState) => state.round.rounds)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(loadAllHistory())
  }, [])

  const remove = () => {
    removeHistory(removeIndex)
    setRemoveIndex(-1)
  }

  return (
    <>
      <HeaderContainer className={classes.root} header={<h2 style={{ fontSize: 24 }}>ラウンド履歴</h2>}>
        <div className={classes.main}>
          {rounds.map((r, idx) => (
            <ExpansionPanel key={moment(r.date).toString()} className={classes.expansion}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className={classes.summary}>
                  <div>{r.course.name}</div>
                  <div className={classes.date}>{moment(r.date).format('YYYY-MM-DD')}</div>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <h3>スコア</h3>
                <div className={classes.border}>
                  <RoundResult round={r} course={r.course as CourseType.Model} />
                </div>
                <h3>オリンピック</h3>
                <div className={classes.border}>
                  <MedalTable score={r.score} />
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                <Button onClick={() => setRemoveIndex(idx)} size='small'>
                  削除
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          ))}
          <div className={classes.footer}>
            <Button
              className={classes.toTop}
              fullWidth
              color='primary'
              variant='contained'
              onClick={() => router.push('/')}
            >
              トップに戻る
            </Button>
          </div>
        </div>
      </HeaderContainer>
      <Dialog open={removeIndex !== -1} onClose={() => setRemoveIndex(-1)}>
        {removeIndex !== -1 && (
          <DialogContent>
            <div className={classes.dialogFieldName}>
              {rounds[removeIndex].course.name}({moment(rounds[removeIndex].date).format('YYYY-MM-DD')})
            </div>
            <div>のスコアを削除しますか？</div>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setRemoveIndex(-1)}>キャンセル</Button>
          <Button variant='contained' onClick={remove}>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HistoryPage
