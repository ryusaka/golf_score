import * as React from 'react'
import { IconButton } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/AddCircle'
import MinusIcon from '@material-ui/icons/RemoveCircle'

import { Props } from 'containers/ScoreInputContainer'
import MedalSelect from 'containers/MedalSelectContainer'

const ScoreInput: React.FunctionComponent<Props> = (props) => {
  const { classes, score, player, hole } = props
  return (
    <div>
      <div className={classes.main}>
        <div className={classes.name}>{player.name}</div>
        <div className={classes.scoreElem}>
          <IconButton disabled={score.scores[hole - 1].stroke <= 1} onClick={() => props.decrement(player, hole)} color='secondary'><MinusIcon className={classes.scoreButtonIcon} /></IconButton>
          <div className={classes.score}>{score.scores[hole - 1].stroke}</div>
          <IconButton onClick={() => props.increment(player, hole)} color='secondary'><PlusIcon className={classes.scoreButtonIcon} /></IconButton>
        </div>
      </div>
      <MedalSelect player={player} score={score} />
    </div>
  )
}

export default ScoreInput