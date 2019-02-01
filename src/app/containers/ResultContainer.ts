import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { ReduxState } from 'lib/store'
import { IPlayer, IScores, IField } from 'lib/interfaces'

import Result from 'components/Result'

export const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    padding: '60px 0',
    background: theme.palette.grey[200],
    overflowY: 'scroll',
  },
  main: {
    padding: 10,
  },
  title: {
    marginTop: 10,
    color: theme.palette.grey[800],
    textAlign: 'center',
  },
})

export interface Props extends WithStyles<typeof styles> {
  field: IField
  players: IPlayer[]
  scores: IScores[]
  history: H.History
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    players: state.player.players,
    field: state.field,
    scores: state.score.scores,
  }))
)(Result)