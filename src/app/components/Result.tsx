import * as React from 'react'
import { Props } from 'containers/ResultContainer'
import Header from 'containers/HeaderContainer'
import ScoreResult from 'containers/ScoreResultContainer'
import MedalResult from 'containers/MedalResultContainer'
import ResultFooter from 'containers/ResultFooterContainer'

const Result: React.FunctionComponent<Props> = (props) => {
  const { scores, players, field, classes } = props

  return (
    <div className={classes.root}>
      <Header><h1 style={{fontSize: 24}}>RESULT</h1></Header>
      <div className={classes.main}>
        <h3 className={classes.title}>スコア</h3>
        <ScoreResult scores={scores} players={players} field={field} />
        <h3 className={classes.title}>オリンピック</h3>
        <MedalResult scores={scores} players={players} field={field} />
      </div>
      <ResultFooter />
    </div>
  )
}

export default Result