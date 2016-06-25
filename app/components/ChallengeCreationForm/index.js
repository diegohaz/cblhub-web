import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './ChallengeCreationForm.scss'

import Button from '../Button'
import Input from '../Input'

const bigIdeaText = <p>The big idea is a broad concept that can be explored in multiple ways, e.g. <strong>Resilience</strong>, <strong>Separation</strong>, <strong>Creativity</strong>, <strong>Health</strong>, <strong>Sustainability</strong>, <strong>Democracy</strong> etc. <a href='http://challengebasedlearning.org/pages/about-cbl' target='_blank'>Learn more</a></p>

const essentialQuestionText = <p>By design, the big idea allows for the generation of a wide variety of essential questions. Eventually the process narrows to one essential question that reflects the interests of the learners and the needs of their community. <a href='http://challengebasedlearning.org/pages/about-cbl' target='_blank'>Learn more</a></p>

const challengeText = <p>From the essential question a concise challenge is articulated that asks the learners to create a specific solution that will result in concrete, meaningful action. <a href='http://challengebasedlearning.org/pages/about-cbl' target='_blank'>Learn more</a></p>

const descriptionText = <p>Summarize the challenge, so people can understand the feelings behind it. Markdown supported. <a href='http://challengebasedlearning.org/pages/about-cbl' target='_blank'>Learn more</a></p>

const ChallengeCreationForm = ({
  fields: { title, bigIdea, essentialQuestion, description },
  submitting,
  handleSubmit,
  error,
  resetForm,
  className = {}
}) => {
  return (
    <form onSubmit={handleSubmit} className={cls(styles.form, className, {[styles.error]: error})}>
      <div className={styles.formError}>{error}</div>
      <div className={styles.formControl}>
        <Input type='text' label='Big Idea' maxLength={48} field={bigIdea} description={bigIdeaText} />
      </div>
      <div className={styles.formControl}>
        <Input type='text' label='Essential Question' maxLength={96} field={essentialQuestion} description={essentialQuestionText} />
      </div>
      <div className={styles.formControl}>
        <Input type='text' label='The Challenge' maxLength={96} field={title} />
        {challengeText}
      </div>
      <div className={styles.formControl}>
        <label htmlFor='challengeDescription'>Description</label>
        <textarea id='challengeDescription' rows={4} maxLength={2048} {...description} />
        {description.touched && description.error &&
          <div className={styles.fieldError}>{description.error}</div>
        }
        {descriptionText}
      </div>
      <div className={styles.formControl}>
        <Button type='submit' disabled={submitting}>Create challenge</Button>
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
  resetForm: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default ChallengeCreationForm
