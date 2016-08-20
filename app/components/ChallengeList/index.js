import React, { PropTypes } from 'react'
import Radium from 'radium'
import { writeMediaQuery, breakpoints } from '../../config/style'

import ChallengeCard from '../ChallengeCard'
import Button from '../Button'

const ChallengeList = ({ challenges, onLoadMore, displayLoadMore }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
      <div style={getListStyle()}>
        {challenges.map((challenge) =>
          <ChallengeCard key={challenge.id} challenge={challenge} style={getCardStyle()} />
        )}
      </div>
      {displayLoadMore && <Button
        onClick={onLoadMore}
        kind='secondary'
        style={{ margin: '4rem auto 0' }}>
        Load more
      </Button>}
    </div>
  )
}

const getListStyle = () => ({
  display: 'flex',
  flexFlow: 'row wrap',
  margin: '0 auto',
  padding: 8,
  maxWidth: 420 * 4 + 8 * 8,
  boxSizing: 'border-box',
  textAlign: 'left',
  [writeMediaQuery(breakpoints.xlarge)]: { maxWidth: 420 * 3 + 8 * 6 },
  [writeMediaQuery(breakpoints.large)]: { maxWidth: 420 * 2 + 8 * 4 },
  [writeMediaQuery(breakpoints.medium)]: { maxWidth: 420 * 2 + 8 * 4 },
  [writeMediaQuery(breakpoints.small)]: { width: '100%', maxWidth: 420, padding: 0 }
})

const getCardStyle = () => ({
  margin: 8,
  width: 'calc(25% - 16px)',
  maxWidth: 420,
  [writeMediaQuery(breakpoints.xlarge)]: { width: 'calc(33.3333% - 16px)' },
  [writeMediaQuery(breakpoints.large)]: { width: 'calc(50% - 16px)' },
  [writeMediaQuery(breakpoints.medium)]: { width: 'calc(50% - 16px)' },
  [writeMediaQuery(breakpoints.small)]: { width: '100%', margin: '8px 0' }
})

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  displayLoadMore: PropTypes.bool
}

export default Radium(ChallengeList)
