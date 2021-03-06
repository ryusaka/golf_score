import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import Header from 'components/Header'
import type { Props as HeaderProps } from 'components/Header'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'hidden',
  },
  content: {
    flex: 1,
    background: theme.palette.common.white,
    overflowY: 'scroll',
  },
}))

type Props = {
  header: React.ReactNode
  className?: string
  headerClasses?: HeaderProps['classes']
  start?: React.ReactNode
  end?: React.ReactNode
}
const HeaderContainer: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  const { header, children, headerClasses, className, start, end } = props

  return (
    <div className={classes.root}>
      <Header start={start} end={end} classes={headerClasses}>
        {header}
      </Header>
      <div style={{ height: 48 }} />
      <div className={clsx(classes.content, className)}>{children}</div>
    </div>
  )
}

export default HeaderContainer
