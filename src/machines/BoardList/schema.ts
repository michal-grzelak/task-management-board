import { BoardListState } from './constants'

export interface BoardListSchema {
    states: {
        [BoardListState.IDLE]: {}
        [BoardListState.FETCHING]: {}
        [BoardListState.ADDING]: {}
        [BoardListState.ERROR]: {}
    }
}
