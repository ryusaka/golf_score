import { connect } from 'react-redux'
import compose from 'recompose/compose'
import * as H from 'history'
import {
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core'
import { WithStyles } from '@material-ui/core'
import { create } from 'modules/field'

import { IHole } from 'lib/interfaces'
import SetupField from 'components/SetupField'

const styles = (theme: Theme) => createStyles({
  root: {
    height: '100%',
    background: theme.palette.grey[200],
    padding: '60px 0',
    overflowY: 'scroll',
  },
  main: {
    overflowY: 'scroll',
    padding: '15px 0',
    margin: 10,
  },
  avatars: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 5,
    padding: 0,
  },
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  selected: {
    background: theme.palette.primary.main,
  },
  hole: {
    width: '100%',
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(even)': {
      background: theme.palette.grey[200],
    },
  },
  holeNumber: {
    width: 50,
    marginRight: 20,
    justifyContent: 'center',
    display: 'flex',
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
  button: {
    height: 40,
  },
  textField: {
    background: theme.palette.common.white,
    margin: 15,
    display: 'flex',
  },
})

export interface State {
  name: string
  holes: IHole[]
}
export interface Props extends WithStyles<typeof styles> {
  history: H.History
  create: (name: string, holes: IHole[]) => void
}

const mapDispatchToProps = {
  create,
}

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(SetupField)