import { DoneInvokeEvent } from 'xstate'
import { Board } from '@models/Board'
import { Column } from '@models/Column'
import { BoardEvents } from './constants'

export type FetchBoardEvent = { type: BoardEvents.FETCH }
export type GoToIdleBoardEvent = { type: BoardEvents.GO_TO_IDLE }
export type FetchBoardSuccessEvent = DoneInvokeEvent<Board>
export type AddColumnSuccessEvent = DoneInvokeEvent<Column>

export type BoardEvent =
    | FetchBoardEvent
    | GoToIdleBoardEvent
    | FetchBoardSuccessEvent
    | AddColumnSuccessEvent
