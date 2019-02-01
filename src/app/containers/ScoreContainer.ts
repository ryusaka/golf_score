import { connect } from 'react-redux'
import * as H from 'history'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { load as loadField } from 'modules/field'
import { back, forward, finish } from 'modules/score'

import { ReduxState } from 'lib/store'
import { IField, IPlayer } from 'lib/interfaces'
import Score from 'components/Score'

const styles = (theme: Theme) => createStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
  },
  root: {
    overflowY: 'scroll',
    padding: '60px 0',
    width: '100%',
    height: '100%',
    background: theme.palette.grey[200],
  },
  textField: {
    width: 300,
  },
  paper: {
    padding: 5,
    margin: '5px 10px',
    borderRadius: 3,
  },
  bottom: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 10,
    display: 'flex',
    borderRadius: 0,
    background: theme.palette.common.white,
  },
  button: {
    flex: 1,
    height: 40,
  },
})

export interface State {
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  field: IField
  now: number
  players: IPlayer[]
  loadField: (name: string) => void
  back: () => void
  forward: () => void
  finish: () => void
}

const mapDispatchToProps = {
  loadField,
  back,
  forward,
  finish,
}

export default withStyles(styles)(connect((state: ReduxState) => ({
  field: state.field,
  players: state.player.players,
  now: state.score.now,
}), mapDispatchToProps)(Score))
