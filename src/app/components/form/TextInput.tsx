import React from 'react'
import clsx from 'clsx'
import { TextField, TextFieldProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { orange } from '@material-ui/core/colors'
import { FieldRenderProps } from 'react-final-form'
import theme from 'lib/theme'

const useStyles = makeStyles<typeof theme>((theme) => ({
  root: {},
  input: {
    background: theme.palette.common.white,
  },
  warn: {
    color: orange[500],
  },
}))

type Props = TextFieldProps & FieldRenderProps<any> & {}

const TextInput = React.forwardRef<any, Props>((props, ref) => {
  const {
    input,
    label,
    autoFocus,
    disabled,
    required,
    placeholder,
    select,
    multiline,
    rows,
    rowsMax,
    meta,
    children,
    className,
    inputProps,
    InputProps,
    InputLabelProps,
    FormHelperTextProps,
    SelectProps,
    fullWidth,
    margin = 'dense',
    hideHelperText,
    variant,
  } = props
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched
  const showWarn = meta.touched && meta.data && meta.data.warning

  const classes = useStyles(props)

  return (
    <TextField
      fullWidth={fullWidth}
      variant={variant || 'outlined'}
      margin={margin}
      // input
      type={input.type}
      name={input.name}
      value={input.value}
      onChange={input.onChange}
      onFocus={input.onFocus}
      onBlur={input.onBlur}
      // TextField props
      classes={{
        root: clsx(classes.root, classes.root, className),
      }}
      label={label}
      autoFocus={autoFocus}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      select={select}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      error={showError}
      helperText={!hideHelperText && (showError ? meta.error || meta.submitError : showWarn ? meta.data.warning : null)}
      inputRef={ref}
      inputProps={inputProps}
      // children props
      InputProps={{
        ...InputProps,
        classes: {
          root: classes.input,
          ...InputProps?.classes,
        },
      }}
      InputLabelProps={{
        shrink: true, // always shrink the label
        ...InputLabelProps,
      }}
      FormHelperTextProps={{
        classes: showWarn ? { root: classes.warn } : {},
        ...FormHelperTextProps,
      }}
      SelectProps={SelectProps}
    >
      {children}
    </TextField>
  )
})

export default TextInput
