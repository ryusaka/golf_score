import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'modules/reducer'
import { load as loadRound } from 'modules/round'
import { useRouter } from 'next/router'
import { Course as CourseType } from 'common/types/models'
import RoundResult from 'components/RoundResult'
import MedalTable from 'components/MedalTable'
import { Typography, Button } from '@material-ui/core'
import HeaderContainer from 'components/HeaderContainer'
import Link from 'next/link'

const Result = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const round = useSelector((state: RootState) => state.round.round)

  React.useEffect(() => {
    dispatch(loadRound(router.query.id))
  }, [])

  if (!round) return null

  return (
    <HeaderContainer header={<div style={{ fontSize: 20, fontWeight: 'bold' }}>ラウンド結果</div>}>
      <Typography style={{ marginTop: 8 }} variant='h6'>
        スコア
      </Typography>
      <RoundResult round={round} course={round.course as CourseType.Model} />
      <Typography style={{ marginTop: 16 }} variant='h6'>
        オリンピック
      </Typography>
      <MedalTable score={round.score} />
      <Link href='/'>
        <Button component='a'>トップに戻る</Button>
      </Link>
    </HeaderContainer>
  )
}

export default Result

// don't remove this code to prevent router.query become empty at first rendering
export const getServerSideProps = () => {
  return { props: {} }
}
