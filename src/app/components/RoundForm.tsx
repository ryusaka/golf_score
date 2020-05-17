import * as React from 'react'
import { Button, Paper, makeStyles, Collapse } from '@material-ui/core'
import clsx from 'clsx'
import BackIcon from '@material-ui/icons/ChevronLeft'
import ForwardIcon from '@material-ui/icons/ChevronRight'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { StrokeInputFF } from './form/StrokeInput'
import { Field, Form } from 'react-final-form'
import { FieldArray, FieldArrayRenderProps } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import { useRouter } from 'next/router'
import { MedalInputFF } from './form/MedalInput'

import type { Course as CourseType, Round as RoundType, Medal } from 'common/types/models'

const updateScore = (score: RoundType.Model['score'], values: Fields, holeIdx: number) => {
  const currentScore = score
  currentScore.mine[holeIdx].stroke = values.scores[0].stroke
  currentScore.mine[holeIdx].put = values.scores[0].put
  currentScore.mine[holeIdx].medal = values.scores[0].medal
  currentScore.others.forEach((o, idx) => {
    o.score[holeIdx].stroke = values.scores[idx + 1].stroke
    o.score[holeIdx].put = values.scores[idx + 1].put
    o.score[holeIdx].medal = values.scores[idx + 1].medal
  })
  return score
}

const mapFunc = (s: RoundType.Score) => {
  return {
    stroke: s.stroke,
    put: s.put,
    medal: s.medal,
  }
}
const mapScoreToValues = (score: RoundType.Model['score'], holeIdx: number) => {
  return [
    { name: 'あなた', ...mapFunc(score.mine[holeIdx]) },
    ...score.others.map((o) => ({ name: o.name, ...mapFunc(o.score[holeIdx]) })),
  ]
}

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 60,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textField: {
    width: 300,
  },
  paper: {
    '&:not(:first-child)': {
      marginTop: 16,
    },
  },
  bottom: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    right: 0,
    padding: 10,
    display: 'flex',
    borderRadius: 0,
    background: theme.palette.common.white,
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  button: {
    flex: 1,
    height: 40,
  },
}))

export type Props = {
  course: CourseType.Model
  round: RoundType.Model
  currentHole: number
  onSubmit: (values: Pick<Fields, 'nextIndex' | 'finish'> & { score: ReturnType<typeof updateScore> }) => any
}

export type Fields = {
  scores: FieldValues[]
  nextIndex?: number
  finish?: boolean
}

const Round: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const [scores, setScores] = React.useState<Fields['scores']>([])

  const { course, round, currentHole, onSubmit } = props

  React.useEffect(() => {
    setScores(mapScoreToValues(round.score, currentHole - 1))
  }, [currentHole])

  const submit = (values: Fields) => {
    onSubmit({
      nextIndex: values.nextIndex,
      finish: values.finish,
      score: updateScore(round.score, values, currentHole - 1),
    })
    if (values.finish) {
      router.push('/result')
    }
  }

  if (!round || !course) return null

  return (
    <Form<Fields> onSubmit={submit} mutators={{ ...arrayMutators }} initialValues={{ scores }}>
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.main}>
            <FieldArray name='scores' component={ScoreArrayInput} currentHole={currentHole} className={classes.paper} />
          </div>
          <div className={classes.bottom}>
            <Button
              disabled={currentHole <= 1}
              className={classes.button}
              color='primary'
              variant='contained'
              type='submit'
              onClick={() => form.change('nextIndex', currentHole - 1)}
            >
              <BackIcon />
              {currentHole !== 1 ? currentHole - 1 : ''}
            </Button>
            <div style={{ width: 10 }} />
            {currentHole === 9 ? (
              <Button
                className={classes.button}
                color='secondary'
                variant='contained'
                type='submit'
                onClick={() => form.change('finish', true)}
              >
                終了
              </Button>
            ) : (
              <Button
                className={classes.button}
                color='primary'
                variant='contained'
                type='submit'
                onClick={() => form.change('nextIndex', currentHole + 1)}
              >
                <ForwardIcon />
                {currentHole + 1}
              </Button>
            )}
          </div>
        </form>
      )}
    </Form>
  )
}

type FieldValues = {
  name: string
  stroke: number
  put?: number
  medal?: Medal
}
type ScoreArrayProps = FieldArrayRenderProps<FieldValues, any> & {
  currentHole: number
  className: string
}
const useArrayStyle = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
  score: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  left: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  numbers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  olympic: {
    marginTop: 'auto',
  },
  put: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    border: `1px solid ${theme.palette.grey[300]}`,
    position: 'relative',
    marginTop: 8,
    paddingTop: 2,
  },
  putLabel: {
    position: 'absolute',
    top: -6,
    left: 6,
    fontSize: 12,
    lineHeight: 1,
    background: theme.palette.common.white,
  },
  medal: {
    marginTop: 6,
  },
}))
const ScoreArrayInput: React.FC<ScoreArrayProps> = (props) => {
  const { fields, className, currentHole } = props
  const classes = useArrayStyle(props)
  const [medalOpens, setMedalOpens] = React.useState([])

  const toggleMedal = (idx) => {
    medalOpens[idx] = !medalOpens[idx]
    setMedalOpens([...medalOpens])
  }

  React.useEffect(() => {
    setMedalOpens([])
  }, [currentHole])

  return (
    <>
      {fields.map((fieldName, idx) => {
        const value = fields.value[idx]
        return (
          <Paper key={fieldName} variant='outlined' className={clsx(className, classes.root)}>
            <div className={classes.score}>
              <div className={classes.left}>
                <div className={classes.name}>{value.name}</div>
                <Button
                  className={classes.olympic}
                  color='primary'
                  onClick={() => toggleMedal(idx)}
                  endIcon={medalOpens[idx] ? <ExpandLess /> : <ExpandMore />}
                >
                  オリンピック
                </Button>
              </div>
              <div className={classes.numbers}>
                <Field name={`${fieldName}.stroke`} component={StrokeInputFF} color='secondary' variant='contained' />
                <div className={classes.put}>
                  <span className={classes.putLabel}>PUT</span>
                  <Field
                    name={`${fieldName}.put`}
                    component={StrokeInputFF}
                    color='primary'
                    variant='outlined'
                    size='small'
                    allowZero
                    parse={(v) => Number(v) || 0}
                    format={(v) => Number(v) || 0}
                  />
                </div>
              </div>
            </div>
            <Collapse in={medalOpens[idx]}>
              <Field name={`${fieldName}.medal`} component={MedalInputFF} className={classes.medal} />
            </Collapse>
          </Paper>
        )
      })}
    </>
  )
}

export default Round
