import { Action } from 'redux'
import { Course } from 'common/types/models'
import { ThunkAction } from 'redux-thunk'
import { client as axiosClient } from 'lib/axiosClient'
import { RootState } from './reducer'

export type State = {
  course: Course.Model
  courses: Course.Model[]
}
export const ActionTypes = {
  LOAD: 'course/LOAD',
  LOAD_ALL: 'course/LOAD_ALL',
  CREATE_COURSE: 'course/CREATE_COURSE',
} as const

type LoadAction = Action<typeof ActionTypes.LOAD> & {
  course: Course.Model
}
export const createLoadAction = (course: Course.Model): LoadAction => ({
  type: ActionTypes.LOAD,
  course,
})

type LoadAllAction = Action<typeof ActionTypes.LOAD_ALL> & {
  courses: Course.Model[]
}
export const createLoadAllAction = (courses: Course.Model[]): LoadAllAction => ({
  type: ActionTypes.LOAD_ALL,
  courses,
})

export const loadAll = (): ThunkAction<Promise<LoadAllAction>, RootState, typeof axiosClient, LoadAllAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get('/api/courses')
    return dispatch(createLoadAllAction(res.data.courses))
  }
}

export const load = (id): ThunkAction<Promise<LoadAction>, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.get(`/api/courses/${id}`)
    return dispatch(createLoadAction(res.data.course))
  }
}

export const createCourse = (
  courseId,
  data
): ThunkAction<Promise<LoadAction>, RootState, typeof axiosClient, LoadAction> => {
  return async (dispatch, getState, client) => {
    const res = await client.post(`/api/courses/${courseId}/courses`, data)
    return dispatch(createLoadAction(res.data.course))
  }
}

type Actions = LoadAction | LoadAllAction

const initialState = {
  course: null,
  courses: [],
}

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.LOAD_ALL: {
      return {
        ...state,
        courses: action.courses,
      }
    }
    case ActionTypes.LOAD: {
      return {
        ...state,
        course: action.course,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
