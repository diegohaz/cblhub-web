import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromChallenge, fetchChallenges, fetchMoreChallenges } from '../store'

import HomePage from '../components/HomePage'

const limit = 24

class HomePageContainer extends Component {
  constructor (props) {
    super(props)
    this.fetchMoreChallenges = this.fetchMoreChallenges.bind(this)
  }

  static propTypes = {
    challenges: PropTypes.array.isRequired,
    fetchChallenges: PropTypes.func.isRequired,
    fetchMoreChallenges: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    displayLoadMore: PropTypes.bool
  }

  static fetchData ({ store, location }) {
    return store.dispatch(fetchChallenges({ q: location.query.q, limit }))
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
    return this.props.fetchChallenges({ q: location.query.q, limit })
  }

  fetchMoreChallenges () {
    const { location } = this.props
    return this.props.fetchMoreChallenges({ q: location.query.q, limit })
  }

  render () {
    return <HomePage
      {...this.props}
      onLoadMore={this.fetchMoreChallenges}
      displayLoadMore={this.props.displayLoadMore} />
  }
}

const mapStateToProps = (state) => ({
  challenges: fromChallenge.getChallengeList(state),
  displayLoadMore: fromChallenge.getCanLoadMore(state)
})

const mapDispatchToProps = {
  fetchChallenges,
  fetchMoreChallenges
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer)
