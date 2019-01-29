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
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 5,
  },
  textField: {
    width: 300,
  },
  player: {
    padding: 10,
    margin: '5px 10px',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 3,
    background: theme.palette.grey[100],
  },
  bottom: {
    position: 'fixed',
    left: 10,
    bottom: 10,
    right: 10,
    display: 'flex',
    background: theme.palette.common.white,
  },
  button: {
    flex: 1,
    height: 50,
  },
  now: {
    flex: 1,
    color: theme.palette.common.black,
    textAlign: 'center',
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
