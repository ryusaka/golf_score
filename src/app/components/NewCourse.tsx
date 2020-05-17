import * as React from 'react'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Button,
  makeStyles,
  Collapse,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import CourseForm from 'components/form/CourseForm'
import type { Field as FieldType } from 'common/types/models'
import { createCourse } from 'modules/field'

type Props = {
  fields: FieldType.Model[]
  classes?: ReturnType<typeof useStyles>
  afterSubmit?: Function
}

const useStyles = makeStyles((theme) => ({
  course: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
  },
}))
const NewCourseForm: React.FC<Props> = (props) => {
  const [field, setField] = React.useState(null)
  const { fields, afterSubmit } = props
  const dispatch = useDispatch()
  const classes = useStyles(props)

  const submit = async (values) => {
    await dispatch(createCourse(field._id, values))
    await afterSubmit?.()
  }

  return (
    <>
      <Collapse in={!field}>
        <Typography variant='subtitle1'>ゴルフ場を選択</Typography>
        <Paper variant='outlined'>
          <List disablePadding className={classes.course}>
            {fields.map((f) => (
              <ListItem key={f._id} button onClick={() => setField(f)}>
                <ListItemText primary={f.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Collapse>
      <Collapse in={field}>
        <Typography onClick={() => setField(null)} variant='subtitle2'>{field?.name}</Typography>
        <CourseForm onSubmit={submit} />
      </Collapse>
    </>
  )
}

type DProps = Props & {
  open: boolean
  onClose: Function
  dialogClasses?: ReturnType<typeof useDStyles>
  responsive?: boolean
}
const useDStyles = makeStyles((theme) => ({
  dialog: {},
  dialogTitle: {},
  dialogContent: {},
  dialogActions: {},
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  addButton: {},
}))
export const NewCourseFormDialog: React.FC<DProps> = (props) => {
  const { open, onClose, dialogClasses, responsive = false, ...rest } = props
  const classes = useDStyles({})
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog open={open} onClose={() => onClose()} className={classes.dialog} fullScreen={responsive && fullScreen}>
      <DialogTitle className={classes.dialogTitle}>
        コースを追加
        <IconButton className={classes.closeButton} onClick={() => onClose()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <NewCourseForm {...rest} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button className={classes.addButton}>追加</Button>
      </DialogActions>
    </Dialog>
  )
}
