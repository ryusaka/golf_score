import * as React from 'react'
import { useAppDispatch, RootState } from 'modules/reducer'
import { load as loadRound } from 'modules/round'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import RoundForm from 'components/RoundForm'
import type { Props as FormProps } from 'components/RoundForm'
import type { Course as CourseType } from 'common/types/models'

import { update as updateRound } from 'modules/round'
import HeaderContainer from 'components/HeaderContainer'
import TeeIcon from 'components/TeeIcon'

type Prop = {}
const Round: React.FC<Prop> = () => {
  const dispatch = useAppDispatch()
  const round = useSelector((state: RootState) => state.round.round)
  const router = useRouter()
  React.useEffect(() => {
    dispatch(loadRound(router.query.id))
    if (!router.query.h) {
      router.replace({ pathname: router.pathname, query: { ...router.query, h: 1 } })
    }
  }, [])

  const submit: FormProps['onSubmit'] = async (values) => {
    dispatch(updateRound(round._id, { score: values.score, finished: values.finished }))
    if (values.finished) {
      router.push('/rounds/[id]/result', `/rounds/${round._id}/result`)
    } else {
      router.push(
        { pathname: '/rounds/[id]', query: { h: values.nextIndex } },
        `/rounds/${round._id}?h=${values.nextIndex}`
      )
    }
  }

  const currentHole = parseInt(router.query.h as string) || 1

  if (!round) return null

  return (
    <HeaderContainer
      header={
        <div
          style={{
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 1.1,
          }}
        >
          <div>
            HOLE: <span style={{ fontSize: 24, marginRight: 10 }}>{currentHole}</span> PAR:{' '}
            <span style={{ fontSize: 24 }}>{round.course.holes[currentHole - 1].par}</span>
          </div>
          <div style={{ display: 'flex' }}>
            {Object.entries(round.course.holes[currentHole - 1].distance).map((v) => (
              <div key={v[0]} style={{ fontSize: 16, display: 'flex', alignItems: 'center' }}>
                <TeeIcon type={v[0]} style={{ marginRight: 8 }} />
                {v[1]}yds
              </div>
            ))}
          </div>
        </div>
      }
    >
      <RoundForm onSubmit={submit} round={round} course={round.course as CourseType.Model} currentHole={currentHole} />
    </HeaderContainer>
  )
}

// don't remove this code to prevent router.query become empty at first rendering
export const getServerSideProps = () => {
  return { props: {} }
}

export default Round
