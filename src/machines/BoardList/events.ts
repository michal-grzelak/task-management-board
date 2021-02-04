import { BoardListEvents } from './constants'

export type FetchBoardsEvent = { type: BoardListEvents.FETCH }

export const fetchBoardsEvent: FetchBoardsEvent = {
    type: BoardListEvents.FETCH,
}

export type BoardListEvent = FetchBoardsEvent
