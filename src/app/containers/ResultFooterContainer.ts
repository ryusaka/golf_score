import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import { WithStyles } from '@material-ui/core'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { save } from 'modules/score'
import ResultFooter from 'components/ResultFooter'
import { withRouter } from 'react-router'

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 10,
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    background: theme.palette.common.white,
    display: 'flex',
  },
  toTop: {
    marginLeft: 5,
    height: 40,
  },
  save: {
    height: 40,
    marginRight: 5,
  },
  snackBar: {
    backgroundColor: green[600],
  },
  infoIcon: {
    backgroundColor: green[600],
    fontSize: 20,
    marginRight: 5,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
})

export interface State {
  saved: boolean
  snack: boolean
}
export interface Props extends WithStyles<typeof styles> {
  save: () => void
  history: H.History
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(null, { save })
)(ResultFooter)
