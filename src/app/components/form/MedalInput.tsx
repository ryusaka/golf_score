import * as React from 'react'
import clsx from 'clsx'
import { Avatar, makeStyles } from '@material-ui/core'

import { medals } from 'common/lib/medal'
import { FieldRenderProps } from 'react-final-form'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  medal: {
    fontSize: 14,
    width: 36,
    height: 36,
    background: theme.palette.common.white,
    color: theme.palette.grey[700],
    padding: 5,
    border: `1px solid ${theme.palette.grey[300]}`,
    marginRight: 5,
  },
  diamond: {
    background: '#efefef',
    color: theme.palette.grey[600],
    border: `1px solid ${theme.palette.grey[600]}`,
  },
  gold: {
    background: '#e6b422',
    color: theme.palette.common.white,
  },
  silver: {
    background: '#C0C0C0',
    color: theme.palette.common.white,
  },
  bronze: {
    background: '#8C4841',
    color: theme.palette.common.white,
  },
  iron: {
    background: '#034358',
    color: theme.palette.common.white,
  },
}))

type FFProps = FieldRenderProps<any> & Props

export const MedalInputFF: React.FC<FFProps> = (props) => {
  const { input, classes, className } = props

  return <MedalInput onChange={input.onChange} value={input.value} classes={classes} className={className} />
}

type Props = {
  onChange: (key: string) => void
  value: any
  classes?: ReturnType<typeof useStyles>
  className?: string
}
export const MedalInput: React.FC<Props> = (props) => {
  const { onChange, value, className } = props
  const classes = useStyles(props)
  return (
    <div className={clsx(classes.root, className)}>
      {Object.keys(medals).map((key) => (
        <Avatar
          key={key}
          onClick={() => onChange(key === value ? '' : key)}
          className={clsx(classes.medal, key === value && classes[key])}
        >
          {medals[key]}
        </Avatar>
      ))}
    </div>
  )
}

export default MedalInput
