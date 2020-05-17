import * as React from 'react'
import clsx from 'clsx'
import { IconButton, makeStyles, IconButtonProps } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/AddCircle'
import PlusIconOutline from '@material-ui/icons/AddCircleOutline'
import MinusIcon from '@material-ui/icons/RemoveCircle'
import MinusIconOutline from '@material-ui/icons/RemoveCircleOutline'
import { FieldRenderProps } from 'react-final-form'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 150,
  },
  small: {
    width: 120,
  },
  score: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
  },
  scoreSmall: {
    fontSize: 18,
  },
  scoreButtonIcon: {
    width: 36,
    height: 36,
  },
  iconSmall: {
    width: 32,
    height: 32,
  },
  button: {
    padding: 4,
  },
}))

type Props = {
  decrement: () => void
  increment: () => void
  stroke: number
  color?: IconButtonProps['color']
  size?: IconButtonProps['size']
  variant?: 'outlined' | 'contained'
  allowZero?: boolean
}

type FFProps = FieldRenderProps<any> & Props

export const StrokeInputFF: React.FC<FFProps> = (props) => {
  const { input, color, size, variant, allowZero } = props
  return (
    <StrokeInput
      stroke={input.value}
      color={color}
      size={size}
      variant={variant}
      allowZero={allowZero}
      decrement={() => input.onChange(Number(input.value) - 1)}
      increment={() => input.onChange(Number(input.value) + 1)}
    />
  )
}

const StrokeInput: React.FC<Props> = (props) => {
  const { stroke, color, variant, size, allowZero = false } = props
  const classes = useStyles(props)

  const Minus = variant === 'outlined' ? MinusIconOutline : MinusIcon
  const Plus = variant === 'outlined' ? PlusIconOutline : PlusIcon

  return (
    <div className={clsx(classes.root, size === 'small' && classes.small)}>
      <IconButton
        disabled={stroke <= (allowZero ? 0 : 1)}
        onClick={() => props.decrement()}
        color={color}
        className={classes.button}
      >
        <Minus className={clsx(classes.scoreButtonIcon, size === 'small' && classes.iconSmall)} />
      </IconButton>
      <div className={clsx(classes.score, size === 'small' && classes.scoreSmall)}>{stroke}</div>
      <IconButton onClick={() => props.increment()} color={color} className={classes.button}>
        <Plus className={clsx(classes.scoreButtonIcon, size === 'small' && classes.iconSmall)} />
      </IconButton>
    </div>
  )
}

export default StrokeInput
