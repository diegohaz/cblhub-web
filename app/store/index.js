import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import forIn from 'lodash/forIn'
import { createSelector } from 'reselect'
import { denormalize } from 'denormalizr'
import challengeSchema from './challenge/challenge.schema'
import guideSchema from './guide/guide.schema'
import entities, * as fromEntities from './entities/entities.reducer'
import challenge, * as fromChallenge from './challenge/challenge.reducer'
import guide, * as fromGuide from './guide/guide.reducer'
import photo, * as fromPhoto from './photo/photo.reducer'
import resource, * as fromResource from './resource/resource.reducer'
import session, * as fromSession from './session/session.reducer'
import status, * as fromStatus from './status/status.reducer'
import tag, * as fromTag from './tag/tag.reducer'
import user, * as fromUser from './user/user.reducer'

export * from './challenge/challenge.actions'
export * from './guide/guide.actions'
export * from './photo/photo.actions'
export * from './session/session.actions'
export * from './tag/tag.actions'
export * from './user/user.actions'

const reducers = combineReducers({
  form: formReducer,
  routing: routerReducer,
  entities,
  challenge,
  guide,
  status,
  photo,
  resource,
  session,
  tag,
  user
})

export default reducers

export const getEntitiesState = (state = {}) => state.entities || {}
export const getChallengeState = (state = {}) => state.challenge || {}
export const getGuideState = (state = {}) => state.guide || {}
export const getPhotoState = (state = {}) => state.photo || {}
export const getResourceState = (state = {}) => state.resource || {}
export const getSessionState = (state = {}) => state.session || {}
export const getStatusState = (state = {}) => state.status || {}
export const getTagState = (state = {}) => state.tag || {}
export const getUserState = (state = {}) => state.user || {}

const fromAll = {
  fromEntities: { selectors: fromEntities, getState: getEntitiesState },
  fromChallenge: { selectors: fromChallenge, getState: getChallengeState },
  fromGuide: { selectors: fromGuide, getState: getGuideState },
  fromPhoto: { selectors: fromPhoto, getState: getPhotoState },
  fromResource: { selectors: fromResource, getState: getResourceState },
  fromSession: { selectors: fromSession, getState: getSessionState },
  fromStatus: { selectors: fromStatus, getState: getStatusState },
  fromTag: { selectors: fromTag, getState: getTagState },
  fromUser: { selectors: fromUser, getState: getUserState }
}

const all = {}

forIn(fromAll, ({ selectors, getState }, store) => {
  all[store] = {}
  forIn(selectors, (selector, selectorName) => {
    if (selectorName !== 'default') {
      all[store][selectorName] = (state, ...rest) => selector(getState(state), ...rest)
    }
  })
})

all.fromChallenge.getChallenge = createSelector(
  getEntitiesState,
  all.fromEntities.getChallenge,
  (entities, challenge) => denormalize(challenge, entities, challengeSchema)
)

all.fromChallenge.getActiveChallenge = createSelector(
  getEntitiesState,
  (state) => all.fromEntities.getChallenge(state, all.fromChallenge.getActiveId(state)),
  (entities, challenge) => denormalize(challenge, entities, challengeSchema)
)

all.fromChallenge.getChallengeList = createSelector(
  getEntitiesState,
  all.fromEntities.getChallenges,
  all.fromChallenge.getListIds,
  (entities, challenges, ids) => {
    return ids.map((id) => denormalize(challenges[id], entities, challengeSchema))
  }
)

all.fromChallenge.getActiveChallengeQuestions = createSelector(
  all.fromChallenge.getActiveChallenge,
  (challenge) => challenge && challenge.guides.filter((guide) => guide.type === 'Question') || []
)

all.fromChallenge.getActiveChallengeActivities = createSelector(
  all.fromChallenge.getActiveChallenge,
  (challenge) => challenge && challenge.guides.filter((guide) => guide.type === 'Activity') || []
)

all.fromChallenge.getActiveChallengeResources = createSelector(
  all.fromChallenge.getActiveChallenge,
  (challenge) => challenge && challenge.guides.filter((guide) => guide.type === 'Resource') || []
)

all.fromGuide.getGuide = createSelector(
  getEntitiesState,
  all.fromEntities.getGuide,
  (entities, guide) => denormalize(guide, entities, guideSchema)
)

all.fromGuide.getActiveGuide = createSelector(
  getEntitiesState,
  (state) => all.fromEntities.getGuide(state, all.fromGuide.getActiveId(state)),
  (entities, guide) => denormalize(guide, entities, guideSchema)
)

all.fromGuide.getGuideList = createSelector(
  getEntitiesState,
  all.fromEntities.getGuides,
  all.fromGuide.getListIds,
  (entities, guides, ids) => ids.map((id) => denormalize(guides[id], entities, guideSchema))
)

all.fromPhoto.getSelectedPhoto = (state, id) =>
  all.fromEntities.getPhoto(state, all.fromPhoto.getSelectedId(state))

all.fromPhoto.getPhotoList = (state) =>
  all.fromPhoto.getListIds(state).map((id) => all.fromEntities.getPhoto(state, id))

all.fromTag.getTagList = (state) =>
  all.fromTag.getListIds(state).map((id) => all.fromEntities.getTag(state, id))

all.fromUser.getActiveUser = (state) =>
  all.fromEntities.getUser(state, all.fromUser.getActiveId(state))

all.fromUser.getCurrentUser = (state) =>
  all.fromEntities.getUser(state, all.fromUser.getCurrentId(state))

forIn(all, (selector, store) => {
  module.exports[store] = selector
  if (store === 'fromEntities') {
    forIn(selector, (fn, name) => {
      module.exports[name] = fn
    })
  }
})
