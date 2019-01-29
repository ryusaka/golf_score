import * as React from 'react'
import { Props } from 'containers/ResultContainer'
import Header from 'containers/HeaderContainer'

const Result: React.FunctionComponent<Props> = (props) => {
  const { scores, players } = props
  return (
    <div>
      <Header>結果</Header>
    </div>
  )
}

export default Result