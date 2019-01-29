import { connect } from 'react-redux'
import compose from 'recompose/compose'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'

import { ReduxState } from 'lib/store'
import MedalSelect from 'components/MedalSelect'
import { IPlayer, IScores } from 'lib/interfaces'
import { medalSelect } from 'modules/score'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  olympic: {
    display: 'flex',
  },
  medal: {
    fontSize: 14,
    width: 36,
    height: 36,
    background: theme.palette.common.white,
    color: theme.palette.grey[700],
    padding: 5,
    border: `1px solid ${theme.palette.grey[300]}`,
    marginRight: 5,
  },
  gold: {
    background: '#e6b422',
    color: theme.palette.common.white,
  },
  silver: {
    background: '#C0C0C0',
    color: theme.palette.common.white,
  },
  blonze: {
    background: '#8C4841',
    color: theme.palette.common.white,
  },
  iron: {
    background: '#034358',
    color: theme.palette.common.white,
  },
})

export interface State {
}
export interface Props extends WithStyles<typeof styles> {
  player: IPlayer
  score: IScores
  hole: number
  medalSelect: (medal: string, player: IPlayer, hole: number) => void
}

const mapDispatchToProps = {
  medalSelect,
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    scores: state.score.scores,
    hole: state.score.now
  }), mapDispatchToProps)
)(MedalSelect)
