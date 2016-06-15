export const FETCH_META = 'FETCH_META'
export const FETCH_META_SUCCESS = 'FETCH_META_SUCCESS'
export const FETCH_META_FAILURE = 'FETCH_META_FAILURE'

export const fetchMeta = (url) => (dispatch, getState, api) => {
  dispatch({ type: FETCH_META, url })
  return api.get('/resources/meta', { params: { url } }).then(({ data }) => {
    dispatch({ type: FETCH_META_SUCCESS, data })
    return data
  }).catch((error) => {
    dispatch({ type: FETCH_META_FAILURE })
    throw error
  })
}
