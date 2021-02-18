import { DoneInvokeEvent } from 'xstate'

import { Board } from '@models/Board'
import { Column } from '@models/Column'
import { Issue } from '@models/Issue'

import { BoardEvents } from './constants'

export type FetchBoardEvent = { type: BoardEvents.FETCH }
export type GoToIdleBoardEvent = { type: BoardEvents.GO_TO_IDLE }
export type UpdateBoardEvent = { type: BoardEvents.UPDATE; board: Board }
export type AddColumnEvent = {
    type: BoardEvents.ADD_COLUMN
    column: Column
}
export type UpdateColumnEvent = {
    type: BoardEvents.UPDATE_COLUMN
    column: Column
}
export type DeleteColumnEvent = {
    type: BoardEvents.DELETE_COLUMN
    id: string
}
export type AddIssueEvent = {
    type: BoardEvents.ADD_ISSUE
    issue: Issue
}
export type UpdateIssueEvent = {
    type: BoardEvents.UPDATE_ISSUE
    issue: Issue
}
export type DeleteIssueEvent = {
    type: BoardEvents.DELETE_ISSUE
    columnId: string
    issueId: string
}

export const updateBoardEvent = (board: Board): UpdateBoardEvent => ({
    type: BoardEvents.UPDATE,
    board,
})
export const addColumnEvent = (column: Column): AddColumnEvent => ({
    type: BoardEvents.ADD_COLUMN,
    column,
})
export const updateColumnEvent = (column: Column): UpdateColumnEvent => ({
    type: BoardEvents.UPDATE_COLUMN,
    column,
})
export const deleteColumnEvent = (id: string): DeleteColumnEvent => ({
    type: BoardEvents.DELETE_COLUMN,
    id,
})
export const addIssueEvent = (issue: Issue): AddIssueEvent => ({
    type: BoardEvents.ADD_ISSUE,
    issue,
})
export const updateIssueEvent = (issue: Issue): UpdateIssueEvent => ({
    type: BoardEvents.UPDATE_ISSUE,
    issue,
})
export const deleteIssueEvent = (
    id: string,
    columnId: string
): DeleteIssueEvent => ({
    type: BoardEvents.DELETE_ISSUE,
    issueId: id,
    columnId,
})

export type BoardEvent =
    | FetchBoardEvent
    | GoToIdleBoardEvent
    | DoneInvokeEvent<Board>
    | DoneInvokeEvent<Column>
    | UpdateBoardEvent
    | AddColumnEvent
    | UpdateColumnEvent
    | DeleteColumnEvent
    | AddIssueEvent
    | UpdateIssueEvent
    | DeleteIssueEvent
