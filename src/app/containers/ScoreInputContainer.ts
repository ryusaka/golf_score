import { connect } from 'react-redux'
import compose from 'recompose/compose'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { ReduxState } from 'lib/store'
import ScoreInput from 'components/ScoreInput'
import { IPlayer, IScores } from 'lib/interfaces'
import { increment, decrement } from 'modules/score'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  name: {
    fontSize: 16,
    flex: 1,
    marginBottom: 20,
  },
  score: {
    flex: 1,
    textAlign: 'center',
  },
  scoreElem: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  scoreButtonIcon: {
    width: 40,
    height: 40,
  },
  scoreButton: {
    width: 40,
    height: 40,
  },
})

export interface State {
}
export interface Props extends WithStyles<typeof styles> {
  score: IScores
  player: IPlayer
  hole: number
  increment: (player: IPlayer, hole: number) => void
  decrement: (player: IPlayer, hole: number) => void
}

interface InputProps {
  player: IPlayer
}

const mapDispatchToProps = {
  increment,
  decrement,
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    scores: state.score.scores,
    hole: state.score.now,
  }),
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps: InputProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    score: stateProps.scores.find(s => s.player === ownProps.player.id),
  }))
)(ScoreInput)
