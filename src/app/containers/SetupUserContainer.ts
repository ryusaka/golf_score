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
    background: theme.palette.grey[200],
    padding: '60px 0',
    height: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
    padding: '30px 20px 20px',
    background: theme.palette.common.white,
    marginBottom: 50,
  },
  submitButton: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
    borderRadius: 0,
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