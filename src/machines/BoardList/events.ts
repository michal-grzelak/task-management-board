import { DoneInvokeEvent } from 'xstate'

import { Board } from '@models/Board'

import { BoardListEvents } from './constants'

export type FetchBoardsEvent = { type: BoardListEvents.FETCH }
export type AddBoardEvent = { type: BoardListEvents.ADD }
export type AddBoardSuccessEvent = DoneInvokeEvent<Board>
export type DeleteBoardEvent = { type: BoardListEvents.DELETE; id: string }
export type DeleteBoardSuccessEvent = DoneInvokeEvent<string>

export const addBoardEvent: AddBoardEvent = {
    type: BoardListEvents.ADD,
}

export const deleteBoardEvent = (id: string): DeleteBoardEvent => ({
    type: BoardListEvents.DELETE,
    id,
})

export type BoardListEvent =
    | FetchBoardsEvent
    | AddBoardEvent
    | AddBoardSuccessEvent
    | DeleteBoardEvent
    | DeleteBoardSuccessEvent
