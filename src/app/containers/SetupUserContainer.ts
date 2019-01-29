import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { WithStyles } from '@material-ui/core'

import { set } from 'modules/player'
import { reset as resetScore } from 'modules/score'
import SetupUser from 'components/SetupUser'
import { IPlayer } from 'lib/interfaces'
import { ReduxState } from 'lib/store';

const styles = (theme: Theme) => createStyles ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    marginBottom: 50,
  },
  submitButton: {
    position: 'fixed',
    left: 10,
    bottom: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
  },
  textField: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    height: 50,
  },
})

export interface State {
  players: string[]
}
export interface Props extends WithStyles<typeof styles> {
  players: IPlayer[]
  history: H.History
  set: (players: {name: string}[]) => void
  resetScore: () => void
}

const mapDispatchToProps = {
  set,
  resetScore,
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    players: state.player.players,
  }), mapDispatchToProps),
)(SetupUser)