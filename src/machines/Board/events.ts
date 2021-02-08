import { BoardEvents } from './constants'

export type FetchBoardEvent = { type: BoardEvents.FETCH }
export type GoToIdleBoardEvent = { type: BoardEvents.GO_TO_IDLE }

export type BoardEvent = FetchBoardEvent | GoToIdleBoardEvent
