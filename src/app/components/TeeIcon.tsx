import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '50%',
    width: 8,
    height: 8,
  },
  regular: {
    border: `1px solid ${theme.palette.common.black}`,
    background: theme.palette.common.white,
  },
  ladies: {
    border: `1px solid ${deepOrange[500]}`,
    background: theme.palette.common.white,
  },
  back: {
    border: `1px solid ${theme.palette.common.black}`,
    background: theme.palette.common.black,
  },
}))

type Prop = {
  type: 'regular' | 'ladies' | 'back' | string
  style?: React.CSSProperties
}
const TeeIcon: React.FC<Prop> = (props) => {
  const classes = useStyles(props)
  return <div style={props.style} className={clsx(classes.root, classes[props.type])} />
}

export default TeeIcon
