import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromChallenge, fetchChallenges } from '../store'

import HomePage from '../components/HomePage'

class HomePageContainer extends Component {
  static propTypes = {
    challenges: PropTypes.array.isRequired,
    fetchChallenges: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  static fetchData ({ store, location }) {
    return store.dispatch(fetchChallenges({ q: location.query.q, limit: 24 }))
  }

  componentDidMount () {
    this.fetchChallenges()
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this.fetchChallenges()
    }
  }

  fetchChallenges () {
    const { location } = this.props
    return this.props.fetchChallenges({ q: location.query.q, limit: 24 })
  }

  render () {
    return <HomePage {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  challenges: fromChallenge.getChallengeList(state)
})

const mapDispatchToProps = {
  fetchChallenges
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
