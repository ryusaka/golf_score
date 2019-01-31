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
      <Header><h2>RESULT</h2></Header>
      <div className={classes.main}>
        <h3 className={classes.title}>スコア</h3>
        <ScoreResult scores={scores} players={players} field={field} />
        <MedalResult scores={scores} players={players} field={field} />
        <ResultFooter />
      </div>
    </div>
  )
}

export default Result