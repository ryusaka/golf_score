import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Form, FormProps, Field } from 'react-final-form'
import { Dialog, DialogContent, DialogActions, DialogProps, Button, useMediaQuery, useTheme, makeStyles, DialogTitle } from '@material-ui/core'

import TextInput from 'components/form/TextInput'

import { create as createField } from 'modules/field'

type Prop = {
  open: boolean
  onClose: DialogProps['onClose']
  afterSubmit: (values: Values) => any
  responsive?: boolean
}
type Values = {
  name: string
}
const useStyles = makeStyles(() => ({
  dialog: {}
}))
export const NewFieldFormDialog: React.FC<Prop> = (props) => {
  const { onClose, open, afterSubmit, responsive } = props
  const dispatch = useDispatch()
  const submit: FormProps<Values>['onSubmit'] = async (values) => {
    await dispatch(createField(values))
    await afterSubmit(values)
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose} className={classes.dialog} fullScreen={responsive && fullScreen}>
      <DialogTitle>
        ゴルフ場新規作成
      </DialogTitle>
      <Form<Values> onSubmit={submit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Field<Values['name']> name='name' label='ゴルフ場名' component={TextInput} />
            </DialogContent>
            <DialogActions>
              <Button type='submit' color='primary' variant='contained'>
                作成
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}
