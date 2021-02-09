import { DoneInvokeEvent } from 'xstate'
import { Board } from '@models/Board'
import { Column } from '@models/Column'
import { BoardEvents } from './constants'

export type FetchBoardEvent = { type: BoardEvents.FETCH }
export type GoToIdleBoardEvent = { type: BoardEvents.GO_TO_IDLE }
export type UpdateBoardEvent = { type: BoardEvents.UPDATE; board: Board }

export const updateBoardEvent = (board: Board): UpdateBoardEvent => ({
    type: BoardEvents.UPDATE,
    board,
})

export type BoardEvent =
    | FetchBoardEvent
    | GoToIdleBoardEvent
    | DoneInvokeEvent<Board>
    | DoneInvokeEvent<Column>
    | UpdateBoardEvent
