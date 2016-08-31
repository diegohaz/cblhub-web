import React, { PropTypes } from 'react'
import Radium from 'radium'
import { writeMediaQuery, breakpoints } from '../../config/style'

import ChallengeCard from '../ChallengeCard'
import Button from '../Button'

const ChallengeList = ({ title, challenges, onLoadMore, displayLoadMore }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
      <div style={getListStyle()}>
        {title && <h2 style={getTitleStyle()}>{title}</h2>}
        {challenges.map((challenge) =>
          <ChallengeCard key={challenge.id} challenge={challenge} style={getCardStyle()} />
        )}
      </div>
      {displayLoadMore && <Button
        onClick={onLoadMore}
        kind="secondary"
        style={{ margin: '4rem auto 0' }}>
        Load more
      </Button>}
    </div>
  )
}

const gutter = 16

const getListStyle = () => ({
  display: 'flex',
  flexFlow: 'row wrap',
  margin: '0 auto',
  padding: gutter,
  maxWidth: 420 * 4 + gutter * 8,
  boxSizing: 'border-box',
  textAlign: 'left',
  [writeMediaQuery(breakpoints.xlarge)]: { maxWidth: 420 * 3 + gutter * 6 },
  [writeMediaQuery(breakpoints.large)]: { maxWidth: 420 * 2 + gutter * 4 },
  [writeMediaQuery(breakpoints.medium)]: { maxWidth: 420 * 2 + gutter * 4 },
  [writeMediaQuery(breakpoints.small)]: { width: '100%', maxWidth: 420, padding: 0 }
})

const getTitleStyle = () => ({
  fontWeight: 300,
  fontSize: '1.6rem',
  width: '100%',
  margin: '0 0 1rem 1rem'
})

const getCardStyle = () => ({
  margin: gutter,
  width: `calc(25% - ${gutter * 2}px)`,
  maxWidth: 420,
  [writeMediaQuery(breakpoints.xlarge)]: { width: `calc(33.3333% - ${gutter * 2}px)` },
  [writeMediaQuery(breakpoints.large)]: { width: `calc(50% - ${gutter * 2}px)` },
  [writeMediaQuery(breakpoints.medium)]: { width: `calc(50% - ${gutter * 2}px)` },
  [writeMediaQuery(breakpoints.small)]: { width: '100%', margin: `${gutter}px 0` }
})

ChallengeList.propTypes = {
  title: PropTypes.string,
  challenges: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  displayLoadMore: PropTypes.bool
}

export default Radium(ChallengeList)
