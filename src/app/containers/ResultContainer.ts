import { connect } from 'react-redux'
import compose from 'recompose/compose'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { ReduxState } from 'lib/store'
import { IPlayer, IScores, IField } from 'lib/interfaces'

import Result from 'components/Result'

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
  }
})

export interface Props extends WithStyles<typeof styles> {
  field: IField
  players: IPlayer[]
  scores: IScores[]
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    players: state.player.players,
    field: state.field,
    scores: state.score.scores,
  }))
)(Result)