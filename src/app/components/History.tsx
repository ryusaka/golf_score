import * as React from 'react'
import {
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  ExpansionPanelActions,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import Header from 'components/Header'
import * as storage from 'lib/storage'
import moment from 'moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { Props, State } from 'containers/HistoryContainer'
import ScoreResult from 'containers/ScoreResultContainer'
import MedalResult from 'containers/MedalResultContainer'

export default class History extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const logs = [] //storage.get('history') || []
    this.state = {
      logs,
      remove: null,
    }
  }

  reload = () => {
    const logs = storage.get('history') || []
    this.setState({ logs })
  }

  remove = () => {
    this.props.removeHistory(this.state.remove)
    this.reload()
    this.setState({ remove: null })
  }

  render() {
    const { classes } = this.props
    const { logs, remove } = this.state
    return (
      <>
        <div className={classes.root}>
          <Header>
            <h2 style={{ fontSize: 24 }}>スコア履歴</h2>
          </Header>
          <div className={classes.main}>
            {logs.map((h, idx) => (
              <ExpansionPanel key={moment(h.date).toString()} className={classes.expansion}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.summary}>
                    <div>{h.field.name}</div>
                    <div className={classes.date}>{moment(h.date).format('YYYY-MM-DD')}</div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  <h3>スコア</h3>
                  <div className={classes.border}>
                    <ScoreResult scores={h.score.scores} players={h.player.players} field={h.field} elevation={0} />
                  </div>
                  <h3>オリンピック</h3>
                  <div className={classes.border}>
                    <MedalResult scores={h.score.scores} players={h.player.players} field={h.field} elevation={0} />
                  </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                  <Button onClick={() => this.setState({ remove: idx })} size='small'>
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
                onClick={() => this.props.history.push('/')}
              >
                トップに戻る
              </Button>
            </div>
          </div>
        </div>
        <Dialog open={remove !== null} onClose={() => this.setState({ remove: null })}>
          {remove !== null && (
            <DialogContent>
              <div className={classes.dialogFieldName}>
                {logs[remove].field.name}({moment(logs[remove].date).format('YYYY-MM-DD')})
              </div>
              <div>のスコアを削除しますか？</div>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={() => this.setState({ remove: null })}>キャンセル</Button>
            <Button variant='contained' onClick={this.remove}>
              削除する
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
