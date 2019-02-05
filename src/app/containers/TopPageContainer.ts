import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as H from 'history'
import { WithStyles } from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { loadFromHistory } from 'modules/field'
import { reset as resetScore } from 'modules/score'
import { reset as resetPlayer } from 'modules/player'

import { ReduxState } from 'lib/store'
import { IField, IHole } from 'lib/interfaces'

import TopPage from 'components/TopPage'

const styles = (theme: Theme) => createStyles({
  root: {
    background: theme.palette.grey[200],
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    padding: '70px 10px 0',
  },
  paper: {
    padding: 10,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  button: {
    height: 40,
    margin: 5,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0',
  },
  secondaryButton: {
    height: 40,
    margin: '0 5px',
  },
  secondaryButtonWrap: {
    display: 'flex',
    marginTop: 10,
  },
  title: {
    color: theme.palette.grey[800],
    textAlign: 'center',
  },
})

export interface State {
  field: IField
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  resetScore: () => void
  resetField: () => void
  resetPlayer: () => void
  loadFromHistory: (field: IField) => void
  field: IField
}

const mapDispatchToProps = {
  resetScore,
  resetPlayer,
  loadFromHistory,
}

export default compose(
  withStyles(styles),
  connect((state: ReduxState) => ({
    field: state.field,
  }), mapDispatchToProps)
)(TopPage)