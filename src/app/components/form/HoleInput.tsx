import React from 'react'
import clsx from 'clsx'
import { IconButton, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FieldRenderProps } from 'react-final-form'
import theme from 'lib/theme'

const useStyles = makeStyles<typeof theme>((theme) => ({
  avatars: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 5,
    padding: 0,
  },
  selected: {
    background: theme.palette.primary.main,
  },
}))

type Props = FieldRenderProps<any>

const HoleInput = React.forwardRef<any, Props>((props, ref) => {
  const classes = useStyles(props)
  const { input } = props

  return (
    <div ref={ref} className={classes.avatars}>
      {[3, 4, 5].map((par) => (
        <IconButton key={par} className={classes.avatar} onClick={() => input.onChange(par)} tabIndex={-1}>
          <Avatar className={clsx(Number(input.value) === par && classes.selected)}>{par}</Avatar>
        </IconButton>
      ))}
    </div>
  )
})

export default HoleInput
