
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    count: 101,
}

export function userReducer(state = initialState, action) {
    // console.log('action', action)

    switch (action.type) {
        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case SET_USER_SCORE:
            const user = { ...state.loggedinUser, score: action.newScore }
            return { ...state, loggedinUser: user }
        default:
            return state
    }
}