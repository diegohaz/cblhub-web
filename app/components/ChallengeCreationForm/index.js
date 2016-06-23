import React, { PropTypes } from 'react'
import cls from 'classnames'
import styles from './ChallengeCreationForm.scss'

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
        <label htmlFor='challengeBigIdea'>Big Idea</label>
        <input type='text' id='challengeBigIdea' maxLength={48} {...bigIdea} />
        {bigIdea.touched && bigIdea.error &&
          <div className={styles.fieldError}>{bigIdea.error}</div>
        }
        {bigIdeaText}
      </div>
      <div className={styles.formControl}>
        <label htmlFor='challengeEssentialQuestion'>Essential Question</label>
        <input type='text' id='challengeEssentialQuestion' maxLength={96} {...essentialQuestion} />
        {essentialQuestion.touched && essentialQuestion.error &&
          <div className={styles.fieldError}>{essentialQuestion.error}</div>
        }
        {essentialQuestionText}
      </div>
      <div className={styles.formControl}>
        <label htmlFor='challengeTitle'>The Challenge</label>
        <input type='text' id='challengeTitle' maxLength={96} {...title} />
        {title.touched && title.error &&
          <div className={styles.fieldError}>{title.error}</div>
        }
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
        <button type='submit' disabled={submitting}>Create challenge</button>
        <button type='button' onClick={resetForm}>Reset</button>
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
