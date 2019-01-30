import * as React from 'react'
import { Button, AppBar, Toolbar } from '@material-ui/core'

import { Props } from 'containers/HeaderContainer'

const Header: React.FunctionComponent<Props> = (props) => {
  const { classes, children } = props
  return (
    <AppBar position='fixed' className={classes.appbar} elevation={1}>
      <Toolbar className={classes.toolbar}>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default Header