import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceHolder'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  console.log(getState().posts.data)

  const abc =  _.chain(getState().posts.data)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .execute()
  
}

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts')

  dispatch({ type: 'FETCH_POSTS', payload: response })
} 

export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`
  )
  dispatch({ type: 'FETCH_USER', payload: response.data })
}

// export const fetchUser = (id) => dispatch => {
//   _fetchUser(id, dispatch)
// }

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`
//   )
//   dispatch({ type: 'FETCH_USER', payload: response.data })
// })
