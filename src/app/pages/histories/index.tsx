import * as React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  makeStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import HeaderContainer from 'components/HeaderContainer'
import RoundResult from 'components/RoundResult'
import MedalTable from 'components/MedalTable'

import { loadAll as loadAllRound, remove as removeRound } from 'modules/round'
import { RootState, useAppDispatch } from 'modules/reducer'

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

type Props = {}

const HistoryPage: React.FC<Props> = () => {
  const classes = useStyles()
  const router = useRouter()
  const [removeId, setRemoveId] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const rounds = useSelector((state: RootState) => state.round.rounds)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    console.log('useEffect')
    dispatch(loadAllRound()).then(() => setLoading(false))
  }, [])

  const remove = async () => {
    await dispatch(removeRound(removeId))
    await dispatch(loadAllRound())
    setRemoveId(null)
  }

  return (
    <>
      <HeaderContainer className={classes.root} header={<h2 style={{ fontSize: 24 }}>ラウンド履歴</h2>}>
        <div className={classes.main}>
          {loading ? (
            <CircularProgress color='secondary' />
          ) : (
            rounds.map((r) => (
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
                  <Button onClick={() => setRemoveId(r._id)} size='small'>
                    削除
                  </Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            ))
          )}
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
      <Dialog open={!!removeId} onClose={() => setRemoveId(null)}>
        {removeId && (
          <DialogContent>
            <div className={classes.dialogFieldName}>
              {rounds.find((r) => r._id === removeId)?.course.name}(
              {moment(rounds.find((r) => r._id === removeId)?.date).format('YYYY-MM-DD')})
            </div>
            <div>のスコアを削除しますか？</div>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setRemoveId(null)}>キャンセル</Button>
          <Button variant='contained' onClick={remove}>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HistoryPage
