import { BoardState } from './constants'

export interface BoardSchema {
    states: {
        [BoardState.IDLE]: {}
        [BoardState.INITIALIZING]: {}
        [BoardState.FETCHING]: {}
        [BoardState.ERROR]: {}
    }
}
