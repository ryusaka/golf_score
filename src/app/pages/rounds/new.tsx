import * as React from 'react'
import { useSelector } from 'react-redux'
import { Button, Paper, makeStyles, List, Collapse, ListItem, ListItemText, Typography } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { loadAll as loadFields } from 'modules/field'
import { loadAll as loadCourses } from 'modules/course'
import { create as createRound } from 'modules/round'
import { RootState, useAppDispatch } from 'modules/reducer'
import HeaderContainer from 'components/HeaderContainer'

import type { Field as FieldType, Course as CourseType } from 'common/types/models'
import { NewCourseFormDialog } from 'components/NewCourse'
import { NewFieldFormDialog } from 'components/NewField'
import { useRouter } from 'next/router'

type Props = {
  onSubmit: (values: any) => any
  field: any
}

const useRootStyles = makeStyles(() => ({
  root: {
    padding: 16,
  },
  subtitle: {
    marginTop: 16,
  },
}))

const Setup: React.FC<Props> = (props) => {
  const [addCourse, setAddCourse] = React.useState(false)
  const [addField, setAddField] = React.useState(false)
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

  const afterCreateNewField = async () => {
    setAddField(false)
    await dispatch(loadFields())
    await dispatch(loadCourses())
  }
  const afterCreateNewCourse = async () => {
    setAddCourse(false)
    await dispatch(loadFields())
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
      <Button style={{ marginRight: 8 }} variant='outlined' color='secondary' onClick={() => setAddCourse(true)}>
        コースを追加する
      </Button>
      <Button variant='outlined' color='primary' onClick={() => setAddField(true)}>
        ゴルフ場を追加する
      </Button>
      <NewCourseFormDialog
        afterSubmit={afterCreateNewCourse}
        responsive
        fields={fields}
        open={addCourse}
        onClose={() => setAddCourse(false)}
      />
      <NewFieldFormDialog
        afterSubmit={afterCreateNewField}
        responsive
        open={addField}
        onClose={() => setAddCourse(false)}
      />
      <Button
        disabled={!selected}
        style={{ height: 48, fontWeight: 'bold', marginTop: 16 }}
        size='large'
        fullWidth
        onClick={submit}
        variant='contained'
        color='primary'
      >
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
