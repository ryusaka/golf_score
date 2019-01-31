import * as H from 'history'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { WithStyles } from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { IFieldStore, IPlayerStore, IScoreStore } from 'lib/interfaces'

import HistoryPage from 'components/History'
import { removeHistory } from 'modules/score'

const styles = (theme: Theme) => createStyles({
  root: {
    background: theme.palette.grey[200],
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
  },
  expansion: {
    margin: '5px 10px',
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
})

export interface State {
  remove: number
  logs: {
    date: Date
    field: IFieldStore
    score: IScoreStore
    player: IPlayerStore
  }[]
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  removeHistory: (index: number) => void
}

export default compose(
  withStyles(styles),
  connect(null, { removeHistory })
)(HistoryPage)