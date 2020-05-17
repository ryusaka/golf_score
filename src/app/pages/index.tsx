import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Paper, makeStyles } from '@material-ui/core'

import HeaderContainer from 'components/HeaderContainer'

import { load as loadUser } from 'modules/auth'

import { IField } from 'lib/interfaces'
import { RootState } from 'modules/reducer'
import Link from 'next/link'
import { client } from 'lib/axiosClient'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    alignSelf: 'stretch',
    margin: 'auto 20px',
    padding: '50px 30px',
  },
  textField: {
    background: theme.palette.common.white,
    marginTop: 30,
    width: 250,
  },
  button: {
    height: 60,
    fontSize: 18,
    '&:not(:last-child)': {
      marginBottom: 20,
    },
  },
  buttonWrap: {
    width: '100%',
    padding: '20px 0',
  },
  title: {
    color: theme.palette.grey[800],
    textAlign: 'center',
  },
}))

const TopPage: React.FC<Props> = (props) => {
  const classes = useStyles(props)
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  React.useEffect(() => {
    dispatch(loadUser())
    client.get('/api/rounds/playing').then((res) => {
      if (res.data.playing) {
        router.push(`/rounds/${res.data.playing}?h=1`)
      }
    })
    router.prefetch('/rounds/new')
  }, [])

  return (
    <HeaderContainer className={classes.root} header={<h1 style={{ fontSize: 24 }}>スコア管理</h1>}>
      <Head>
        <title>ゴルフスコア管理</title>
      </Head>
      <Paper variant='outlined' className={classes.paper}>
        {user ? (
          <>
            <h2 className={classes.title}>{user.name || user.userId}さん</h2>
            <div className={classes.buttonWrap}>
              <Link href='/rounds/new'>
                <Button className={classes.button} fullWidth variant='contained' color='primary'>
                  開始
                </Button>
              </Link>
              <Link href='/histories'>
                <Button component='a' className={classes.button} fullWidth variant='outlined' color='secondary'>
                  履歴を見る
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Button
            className={classes.button}
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => router.push('/sign-up')}
          >
            登録する
          </Button>
        )}
      </Paper>
    </HeaderContainer>
  )
}

export type Props = {
  loadField: (name: string) => void
  resetScore: () => void
  resetField: () => void
  resetPlayer: () => void
  field: IField
}

// const mapDispatchToProps = {
//   loadField,
//   resetScore,
//   resetPlayer,
// }

export default TopPage
