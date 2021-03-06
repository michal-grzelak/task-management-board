import { BoardListState, BoardListUpdatingState } from './constants'

export interface BoardListSchema {
    states: {
        [BoardListState.IDLE]: {}
        [BoardListState.FETCHING]: {}
        [BoardListState.UPDATING]: {
            states: {
                [BoardListUpdatingState.ADDING]: {}
                [BoardListUpdatingState.DELETING]: {}
            }
        }
        [BoardListState.ERROR]: {}
    }
}
