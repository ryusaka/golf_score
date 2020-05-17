import * as React from 'react'
import { Form, Field } from 'react-final-form'
import clsx from 'clsx'
import { Button, Paper, makeStyles, Typography } from '@material-ui/core'
import arrayMutators from 'final-form-arrays'
import { FieldArray, FieldArrayRenderProps } from 'react-final-form-arrays'

import HoleInput from 'components/form/HoleInput'
import TextInput from 'components/form/TextInput'
import type { Field as FieldModel, Course as CourseModel } from 'common/types/models'

type CourseFormProps = {
  onSubmit: (values: FieldModel.Model) => any
  field?: FieldModel.Model
  course?: CourseModel.Model
}

const initialHoles = (course: CourseModel.Model) => {
  return [...new Array(9)].map((_, idx) => ({
    number: course?.holes[idx]?.number || idx + 1,
    par: course?.holes[idx]?.par || 4,
    distance: course?.holes[idx]?.distance || {
      regular: 0,
    },
  }))
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    overflowY: 'scroll',
  },
  formBody: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  formAction: {
    left: 0,
    bottom: 0,
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
    paddingTop: 8,
    paddingBottom: 8,
  },
  name: {
    padding: 16,
    marginBottom: 16,
  },
  main: {
    padding: '16px 0',
  },
  avatars: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  summary: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  distanceHeader: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    height: 40,
  },
}))

const CourseForm: React.FC<CourseFormProps> = (props) => {
  const classes = useStyles(props)
  const holeClasses = useHoleStyles()

  const { onSubmit, course } = props
  return (
    <Form onSubmit={onSubmit} mutators={{ ...arrayMutators }} initialValues={{ holes: initialHoles(course) }}>
      {({ handleSubmit, values }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <div className={classes.formBody}>
            <Typography variant='h6'>コース名</Typography>
            <Field name='name' component={TextInput} InputProps={{ autoFocus: true }} fullWidth />
            <Typography variant='h6'>コース情報</Typography>
            <Paper variant='outlined' className={classes.main}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                <div style={{ fontWeight: 'bold', textAlign: 'center' }} className={holeClasses.holeNumber}>
                  No.
                </div>
                <div style={{ fontWeight: 'bold', textAlign: 'center' }} className={classes.avatars}>
                  PAR
                </div>
                <div className={classes.distanceHeader}>
                  <div style={{ alignSelf: 'center', fontWeight: 'bold' }}>Distance</div>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span>regular</span>
                    <span>ladies</span>
                    <span>back</span>
                  </div>
                </div>
              </div>
              <FieldArray name='holes' component={Holes} />
              <div className={clsx(holeClasses.hole, classes.summary)}>
                <div className={holeClasses.holeNumber}>Total</div>
                <div className={holeClasses.par} style={{ textAlign: 'center' }}>
                  {values.holes.reduce((t, c) => (c.par || 0) + t, 0)}
                </div>
                <div className={holeClasses.distance} style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <span>{values.holes.reduce((t, c) => (parseInt(c.distance?.regular, 10) || 0) + t, 0)}</span>
                  <span>{values.holes.reduce((t, c) => (parseInt(c.distance?.ladies, 10) || 0) + t, 0)}</span>
                  <span>{values.holes.reduce((t, c) => (parseInt(c.distance?.back, 10) || 0) + t, 0)}</span>
                </div>
              </div>
            </Paper>
          </div>
          <div className={classes.formAction}>
            <Button fullWidth className={classes.button} color='primary' variant='contained' type='submit'>
              作成
            </Button>
          </div>
        </form>
      )}
    </Form>
  )
}

export const Holes: React.FC<FieldArrayRenderProps<any, any>> = (props) => {
  const { fields } = props
  const classes = useHoleStyles(props)
  return (
    <>
      {fields.map((name, idx) => (
        <div key={name} className={classes.hole}>
          <div className={classes.holeNumber}>{fields.value[idx].number}</div>
          <div className={classes.par}>
            <Field name={`${name}.par`} component={HoleInput} />
          </div>
          <div className={classes.distance}>
            <Field
              variant='standard'
              className={classes.distanceInputWrap}
              classes={{ input: classes.distanceInput }}
              name={`${name}.distance.regular`}
              component={TextInput}
              type='number'
            />
            <Field
              variant='standard'
              className={classes.distanceInputWrap}
              classes={{ input: classes.distanceInput }}
              name={`${name}.distance.ladies`}
              component={TextInput}
              type='number'
            />
            <Field
              variant='standard'
              className={classes.distanceInputWrap}
              classes={{ input: classes.distanceInput }}
              name={`${name}.distance.back`}
              component={TextInput}
              type='number'
            />
          </div>
        </div>
      ))}
    </>
  )
}

const useHoleStyles = makeStyles((theme) => ({
  hole: {
    width: '100%',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(even)': {
      background: theme.palette.grey[200],
    },
  },
  holeNumber: {
    minWidth: 36,
    width: 36,
    justifyContent: 'center',
    display: 'flex',
  },
  par: {
    flex: 1,
  },
  distance: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  distanceInputWrap: {
    '&:not(:last-child)': {
      marginRight: 4,
    },
  },
  distanceInput: {
    background: 'transparent',
    '& > input': {
      textAlign: 'center',
    },
  },
}))

export default CourseForm
