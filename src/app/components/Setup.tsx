import * as React from 'react'
import {
  Avatar,
  IconButton,
  Button,
} from '@material-ui/core'
import { Props, State } from 'containers/SetupContainer'
import Header from 'containers/HeaderContainer'

export default class Setup extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      holes: props.holes || [],
    }
  }

  componentDidMount() {
    const { field: { holes } } = this.props
    this.setState({holes})
  }

  setPar = (par) => (hole) => () => {
    const { holes } = this.state
    holes[hole - 1].par = par
    this.setState({holes})
  }

  submit = () => {
    this.props.setHole(this.state.holes)
    this.props.history.push('/setup-user')
  }

  render() {
    const { classes, field } = this.props
    const { holes } = this.state

    return (
      <>
        <Header>
          <div className={classes.header}>
            <h2 style={{textAlign: 'center'}}>コース情報入力</h2>
            <h3 style={{textAlign: 'center'}}>{field.name}</h3>
          </div>
        </Header>
        <div className={classes.root}>
          <div className={classes.main}>
            <div className={classes.hole}>
              <div className={classes.holeNumber}>ホール</div>
              <div className={classes.avatars}>PAR</div>
            </div>
            {holes.map(hole =>
              <div key={`hole_${hole.number}`} className={classes.hole}>
                <div className={classes.holeNumber}>{hole.number}</div>
                <div className={classes.avatars}>
                  <IconButton className={classes.avatar} onClick={this.setPar(3)(hole.number)}><Avatar className={hole.par === 3 ? classes.selected : ''}>3</Avatar></IconButton>
                  <IconButton className={classes.avatar} onClick={this.setPar(4)(hole.number)}><Avatar className={hole.par === 4 ? classes.selected : ''}>4</Avatar></IconButton>
                  <IconButton className={classes.avatar} onClick={this.setPar(5)(hole.number)}><Avatar className={hole.par === 5 ? classes.selected : ''}>5</Avatar></IconButton>
                </div>
              </div>
            )}
          </div>
          <div className={classes.submitButton}>
            <Button className={classes.button} color='primary' variant='contained' onClick={this.submit}>次へ</Button>
          </div>
        </div>
      </>
    )
  }
}

