import React, { PropTypes } from 'react'

import Dialog from '../Dialog'
import Button from '../Button'
import FormControl from '../FormControl'

const bigIdeaText = <p>The big idea is a broad concept that can be explored in multiple ways, e.g. <strong>Resilience</strong>, <strong>Separation</strong>, <strong>Creativity</strong>, <strong>Health</strong>, <strong>Sustainability</strong>, <strong>Democracy</strong> etc.</p>

const essentialQuestionText = <p>By design, the big idea allows for the generation of a wide variety of essential questions. Eventually the process narrows to one essential question that reflects the interests of the learners and the needs of their community.</p>

const challengeText = <p>From the essential question a concise challenge is articulated that asks the learners to create a specific solution that will result in concrete, meaningful action.</p>

const descriptionText = <p>Summarize the challenge, so people can understand the feelings behind it. Markdown supported.</p>

const ChallengeCreationForm = ({
  ...props,
  fields: { title, bigIdea, essentialQuestion, description },
  submitting,
  handleSubmit,
  error,
  onSubmit,
  resetForm
}) => {
  const submit = (values, dispatch) => onSubmit(values, dispatch, props)
  return (
    <form onSubmit={handleSubmit(submit)}>
      {error && <Dialog type='error'>{error}</Dialog>}
      <FormControl
        label='Big Idea'
        field={{ ...bigIdea, maxLength: 48 }}
        desc={bigIdeaText} />
      <FormControl
        label='Essential Question'
        field={{ ...essentialQuestion, maxLength: 96 }}
        desc={essentialQuestionText} />
      <FormControl
        label='The Challenge'
        field={{ ...title, maxLength: 96 }}
        desc={challengeText} />
      <FormControl
        type='textarea'
        label='Description'
        field={{ rows: 4, maxLength: 1024, ...description }}
        desc={descriptionText} />
      <div>
        <Button type='submit' disabled={submitting} style={{ marginRight: '1rem' }}>Create challenge</Button>
        <Button kind='secondary' type='button' onClick={resetForm}>Reset</Button>
      </div>
    </form>
  )
}

ChallengeCreationForm.propTypes = {
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired
}

export default ChallengeCreationForm
