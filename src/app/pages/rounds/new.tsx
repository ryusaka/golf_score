import * as React from 'react'
import { useSelector } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Button, Paper, makeStyles, List, Collapse, ListItem, ListItemText, Typography } from '@material-ui/core'
import arrayMutators from 'final-form-arrays'
import { FieldArrayRenderProps, FieldArray } from 'react-final-form-arrays'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { loadAll as loadFields } from 'modules/field'
import { loadAll as loadCourses } from 'modules/course'
import { create as createRound } from 'modules/round'
import { RootState, useAppDispatch } from 'modules/reducer'
import HoleInput from 'components/form/HoleInput'
import HeaderContainer from 'components/HeaderContainer'

import type { Field as FieldType, Course as CourseType } from 'common/types/models'
import { NewCourseFormDialog } from 'components/NewCourse'
import { useRouter } from 'next/router'

const useRootStyles = makeStyles(() => ({
  root: {
    padding: 16,
  },
  subtitle: {
    marginTop: 16,
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    background: theme.palette.common.white,
    padding: '60px 0',
    overflowY: 'scroll',
  },
  main: {
    overflowY: 'scroll',
    padding: '15px 0',
    margin: 10,
  },
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  avatars: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  selected: {
    background: theme.palette.primary.main,
  },
  hole: {
    width: '100%',
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(even)': {
      background: theme.palette.grey[200],
    },
  },
  holeNumber: {
    width: 50,
    marginRight: 20,
    justifyContent: 'center',
    display: 'flex',
  },
  submitButton: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
    borderRadius: 0,
  },
  button: {
    height: 40,
  },
}))

const Setup: React.FC<Props> = (props) => {
  const [addCourse, setAddCourse] = React.useState(false)
  const [selected, setSelected] = React.useState<Parameters<CourseChoiceProps['onSelect']>[0]>(null)
  const courses = useSelector((state: RootState) => state.course.courses)
  const fields = useSelector((state: RootState) => state.field.fields)
  const classes = useRootStyles(props)
  const dispatch = useAppDispatch()
  const router = useRouter()

  React.useEffect(() => {
    dispatch(loadFields())
    dispatch(loadCourses())
  }, [])

  const onSelect: CourseChoiceProps['onSelect'] = (values) => {
    setSelected(values)
  }

  const afterCreateNewCourse = async () => {
    setAddCourse(false)
    await dispatch(loadCourses())
  }

  const submit = async () => {
    const res = await dispatch(createRound({ course: selected.course, partnerNames: ['ayako', 'fmy'] }))
    router.push({ pathname: '/rounds/[id]', query: { h: 1 } }, `/rounds/${res.round._id}?h=1`)
  }

  return (
    <HeaderContainer className={classes.root} header={<h1 style={{ fontSize: 24 }}>新規ラウンド</h1>}>
      <Typography variant='h6'>コース</Typography>
      <div style={{ marginLeft: 8 }}>
        {selected
          ? `${fields.find((f) => f._id === selected.field)?.name} ${
              courses.find((c) => c._id === selected.course)?.name
            }`
          : 'コースを選択してください'}
      </div>
      <Typography className={classes.subtitle} variant='subtitle1'>
        既存のコースから選択
      </Typography>
      <Paper variant='outlined'>
        <CourseSelect fields={fields} courses={courses} onSelect={onSelect} />
      </Paper>
      <Typography className={classes.subtitle} variant='subtitle1'>
        一覧にない時
      </Typography>
      <Button variant='outlined' color='secondary' onClick={() => setAddCourse(true)}>コースを追加する</Button>
      <NewCourseFormDialog
        afterSubmit={afterCreateNewCourse}
        responsive
        fields={fields}
        open={addCourse}
        onClose={() => setAddCourse(false)}
      />
      <Button fullWidth onClick={submit} variant='contained' color='primary'>
        開始する
      </Button>
    </HeaderContainer>
  )
}
// export const getInitialProps = () => {

// }
export default Setup

type CourseChoiceProps = {
  fields: FieldType.Model[]
  courses: CourseType.Model[]
  onSelect: (value: { field: FieldType.Model['_id']; course: CourseType.Model['_id'] }) => void
}
const useCourseStyles = makeStyles((theme) => ({
  field: {
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.grey[300]}`,
    },
  },
  courses: {},
  course: {
    marginLeft: theme.spacing(4),
  },
}))
const CourseSelect: React.FC<CourseChoiceProps> = (props) => {
  const { courses, fields, onSelect } = props
  const [opens, setOpens] = React.useState([])
  const classes = useCourseStyles(props)

  return (
    <div>
      <List disablePadding>
        {fields.map((f) => {
          const open = opens.includes(f._id)
          const fieldCourses = courses.filter((c) => f._id === c.field)
          return (
            <React.Fragment key={f._id}>
              <ListItem
                className={classes.field}
                onClick={() => {
                  setOpens(open ? opens.filter((o) => o !== f._id) : [...opens, f._id])
                }}
              >
                <ListItemText primary={f.name} />
                {opens.includes(f._id) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse className={classes.courses} in={opens.includes(f._id)} unmountOnExit>
                <List disablePadding className={classes.course}>
                  {fieldCourses?.map((c) => (
                    <ListItem key={c._id} button onClick={() => onSelect({ field: f._id, course: c._id })}>
                      <ListItemText primary={c.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          )
        })}
      </List>
    </div>
  )
}

const Holes: React.FC<FieldArrayRenderProps<any, any>> = (props) => {
  const { fields } = props
  const classes = useStyles(props)
  return (
    <>
      {fields.map((name, idx) => (
        <div key={name} className={classes.hole}>
          <div className={classes.holeNumber}>{fields.value[idx].number}</div>
          <Field name='par' component={HoleInput} />
        </div>
      ))}
    </>
  )
}

type Props = {
  onSubmit: (values: any) => any
  field: any
}
const NewRound: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  const { onSubmit, field } = props
  return (
    <Form onSubmit={onSubmit} mutators={{ ...arrayMutators }} initialValues={{ holes: field?.holes }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.root}>
          <Paper className={classes.main}>
            <div className={classes.hole}>
              <div className={classes.holeNumber}>ホール</div>
              <div className={classes.avatars}>PAR</div>
            </div>
            <FieldArray name='holes' component={Holes} />
          </Paper>
          <Paper className={classes.submitButton}>
            <Button className={classes.button} color='primary' variant='contained' type='submit'>
              次へ
            </Button>
          </Paper>
        </form>
      )}
    </Form>
  )
}
