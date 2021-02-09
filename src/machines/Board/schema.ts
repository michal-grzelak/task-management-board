import { BoardState, BoardUpdatingState } from './constants'

export interface BoardSchema {
    states: {
        [BoardState.IDLE]: {}
        [BoardState.INITIALIZING]: {}
        [BoardState.FETCHING]: {}
        [BoardState.UPDATING]: {
            states: {
                [BoardUpdatingState.ADDING_COLUMN]: {}
            }
        }
        [BoardState.ERROR]: {}
    }
}
