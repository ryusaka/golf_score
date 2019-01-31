import * as React from 'react'
import { Avatar } from '@material-ui/core'
import classname from 'lib/classname'
import { State, Props } from 'containers/MedalSelectContainer'

export default class Score extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getClassName = (medal) => {
    if (medal === 'D') return this.props.classes.diamond
    if (medal === '金') return this.props.classes.gold
    if (medal === '銀') return this.props.classes.silver
    if (medal === '銅') return this.props.classes.blonze
    if (medal === '鉄') return this.props.classes.iron
    return null
  }

  render() {
    const { classes, player, medalSelect, hole, score } = this.props
    return (
      <div className={classes.olympic}>
        {['D', '金', '銀', '銅', '鉄'].map(medal =>
          <Avatar
            key={medal}
            onClick={() => medalSelect(medal, player, hole)}
            className={classname(classes.medal, medal === score.scores[hole - 1].medal && this.getClassName(medal))}
          >
            {medal}
          </Avatar>
        )}
      </div>
    )
  }
}
