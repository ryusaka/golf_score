import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as H from 'history'
import { WithStyles } from '@material-ui/core'
import { withStyles, createStyles, Theme } from '@material-ui/core'
import { load as loadField } from 'modules/field'
import { reset as resetScore } from 'modules/score'
import { reset as resetPlayer } from 'modules/player'

import { ReduxState } from 'lib/store'
import { IField } from 'lib/interfaces'

import TopPage from 'components/TopPage'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.grey[200],
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
    },
    paper: {
      margin: 'auto 20px',
      padding: '50px 30px',
    },
    textField: {
      background: theme.palette.common.white,
      marginTop: 30,
      width: 250,
    },
    button: {
      height: 40,
      marginTop: 20,
    },
    buttonWrap: {
      width: '100%',
      padding: '20px 0',
    },
    title: {
      color: theme.palette.grey[800],
      textAlign: 'center',
    },
  })

export interface State {
  name: string
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  loadField: (name: string) => void
  resetScore: () => void
  resetField: () => void
  resetPlayer: () => void
  field: IField
}

const mapDispatchToProps = {
  loadField,
  resetScore,
  resetPlayer,
}

export default compose(
  withStyles(styles),
  connect(
    (state: ReduxState) => ({
      field: state.field,
    }),
    mapDispatchToProps
  )
)(TopPage)
