import { BoardState, BoardUpdatingState } from './constants'

export interface BoardSchema {
    states: {
        [BoardState.IDLE]: {}
        [BoardState.INITIALIZING]: {}
        [BoardState.FETCHING]: {}
        [BoardState.UPDATING]: {
            states: {
                [BoardUpdatingState.ADDING_COLUMN]: {}
                [BoardUpdatingState.UPDATING_COLUMN]: {}
                [BoardUpdatingState.DELETING_COLUMN]: {}
                [BoardUpdatingState.ADDING_ISSUE]: {}
                [BoardUpdatingState.UPDATING_ISSUE]: {}
                [BoardUpdatingState.DELETING_ISSUE]: {}
                [BoardUpdatingState.UPDATING]: {}
            }
        }
        [BoardState.ERROR]: {}
    }
}
