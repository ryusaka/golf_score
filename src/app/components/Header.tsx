import * as React from 'react'
import { AppBar, Toolbar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    height: 48,
    background: theme.palette.common.white,
    position: 'fixed',
  },
  toolbar: {
    height: 48,
    minHeight: 0,
    justifyContent: 'center',
    color: theme.palette.grey[800],
  },
}))

export type Props = {
  classes?: ReturnType<typeof useStyles>
}
const Header: React.FC<Props> = (props) => {
  const { children } = props
  const classes = useStyles(props)

  return (
    <AppBar position='relative' className={classes.appBar} elevation={1}>
      <Toolbar className={classes.toolbar}>{children}</Toolbar>
    </AppBar>
  )
}

export default Header
