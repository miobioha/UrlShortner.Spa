import {
    REQUEST_SHORTENED_URL,
    RECEIVE_SHORTENED_URL
} from '../actions/shortenUrlActions'

export default function shortenUrlReducer(
    state = {
      isFetching: false,
      originalLink: '',
      shortLink: ''
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_SHORTENED_URL:
        return Object.assign({}, state, {
          isFetching: true
        })
      case RECEIVE_SHORTENED_URL:
        return Object.assign({}, state, {
          isFetching: false,
          originalLink: action.originalLink,
          shortLink: action.shortLink
        })
      default:
        return state
    }
  }