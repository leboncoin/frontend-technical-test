import { CurrentUser } from '../../types/user'
import { ActionType } from '../../types/actionType'

export const isKnownReducer = (
  state: CurrentUser,
  action: ActionType
): CurrentUser => {
  switch (action.type) {
    case 'ISKNOWN': {
      return { ...state, ...action.payload, isLogged: true }
    }
    case 'ISUNKNOWN': {
      return { ...state, isLogged: false }
    }
    default:
      return { ...state, isLogged: false }
  }
}
