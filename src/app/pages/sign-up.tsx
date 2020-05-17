import * as React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Button, CircularProgress, makeStyles } from '@material-ui/core'

import TextInput from 'components/form/TextInput'

import { signUp } from 'modules/auth'

const useStyles = makeStyles(() => ({
  root: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {},
}))

const validate = (values) => {
  const errors: any = {}
  if (!values.userId) {
    errors.userId = '必須'
  }
  if (!values.password) {
    errors.password = '必須'
  }
  return errors
}
const Login = (props) => {
  const { className } = props
  const classes = useStyles(props)
  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = async (values) => {
    const { userId, password } = values
    await dispatch(signUp(userId, password))
    await router.push('/')
  }

  return (
    <div className={clsx(classes.root, className)}>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='userId'
              component={TextInput}
              label='ユーザーID'
              normalize={(s) => s.trim()}
              className={classes.field}
            />
            <Field
              name='password'
              component={TextInput}
              label='パスワード'
              type='password'
              normalize={(s) => s.trim()}
              className={classes.field}
            />
            <Button variant='contained' type='submit' disabled={submitting} color='primary'>
              {submitting ? <CircularProgress size={20} color='secondary' /> : '登録する'}
            </Button>
          </form>
        )}
      </Form>
    </div>
  )
}

export default Login
