import React from 'react'

import Page from '../Page'
import ChallengeCreationForm from '../../containers/ChallengeCreationForm'
import Separator from '../Separator'

const ChallengeCreationPage = () => {
  return (
    <Page title="Create Challenge">
      <ChallengeCreationForm />
      <Separator />
      <div style={{ fontSize: '0.85rem' }}>For a better experience, please write in English.</div>
    </Page>
  )
}

export default ChallengeCreationPage
