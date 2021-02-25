import { assign, DoneInvokeEvent, EventObject, Receiver, Sender } from 'xstate'

import { Board } from '@models/Board'

import { BoardContext } from './context'
import { BoardEvents } from './constants'
import {
    AddColumnEvent,
    AddIssueEvent,
    BoardEvent,
    DeleteColumnEvent,
    DeleteIssueEvent,
    fetchBoardEvent,
    FetchBoardEvent,
    updateBoardEvent,
    UpdateBoardEvent,
    UpdateColumnEvent,
    UpdateIssueEvent,
} from './events'

export const initialize = (_context: BoardContext, _event: BoardEvent) => (
    callback: Sender<any>,
    _: Receiver<EventObject>
) => {
    if (!_context.board) callback(fetchBoardEvent(_context.id))
    else callback(BoardEvents.GO_TO_IDLE)
}

export const fetchBoard = (_context: BoardContext, _event: FetchBoardEvent) => {
    console.log('Fetching board...')

    const board = _context.boardService.getBoard(_event.id)

    console.log(_event)

    if (board) return Promise.resolve(board)

    return Promise.reject()
}

export const fetchBoardSuccess = assign<BoardContext, DoneInvokeEvent<Board>>(
    (_context, _event) => {
        console.log('Fetch board success!')

        const board = _event.data

        return {
            board,
        }
    }
)

export const fetchBoardFailure = (
    _context: BoardContext,
    _event: BoardEvent
) => {
    console.log('Fetch board failure!')
}

export const updateBoard = (
    _context: BoardContext,
    _event: UpdateBoardEvent
) => {
    console.log('Updating board...')

    const board = _context.boardService.updateBoard(_event.board)

    if (board) return Promise.resolve(board)

    return Promise.reject()
}

export const updateBoardSuccess = assign<BoardContext, DoneInvokeEvent<Board>>(
    (_context, _event) => {
        console.log('Update board success!')

        const board = _event.data

        return {
            board,
        }
    }
)

export const updateBoardFailure = (
    _context: BoardContext,
    _event: BoardEvent
) => {
    console.log('Update board failure!')
}

export const addColumn = (_context: BoardContext, _event: AddColumnEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Adding column...')

    const board = { ..._context.board! }

    board.columns.push(_event.column)

    callback(updateBoardEvent(board))
}

export const updateColumn = (
    _context: BoardContext,
    _event: UpdateColumnEvent
) => (callback: Sender<BoardEvent>, _: Receiver<BoardEvent>) => {
    console.log('Updating column...')

    const board = { ..._context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === _event.column.id
    )

    if (columnIndex >= 0) {
        board.columns[columnIndex] = _event.column

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

export const deleteColumn = (
    _context: BoardContext,
    _event: DeleteColumnEvent
) => (callback: Sender<BoardEvent>, _: Receiver<BoardEvent>) => {
    console.log('Deleting column...')

    const board = { ..._context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === _event.id
    )

    if (columnIndex >= 0) {
        board.columns.splice(columnIndex, 1)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

export const addIssue = (_context: BoardContext, _event: AddIssueEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Adding issue...')

    const board: Board = { ..._context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === _event.issue.columnId
    )

    if (columnIndex >= 0) {
        board.columns[columnIndex].issues.push(_event.issue)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

export const updateIssue = (
    _context: BoardContext,
    _event: UpdateIssueEvent
) => (callback: Sender<BoardEvent>, _: Receiver<BoardEvent>) => {
    console.log('Updating issue...')

    const board: Board = { ..._context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === _event.issue.columnId
    )

    const issueIndex: number = board.columns[columnIndex]?.issues?.findIndex(
        ({ id }) => id === _event.issue.id
    )

    if (issueIndex >= 0) {
        board.columns[columnIndex].issues[issueIndex] = _event.issue

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

export const deleteIssue = (
    _context: BoardContext,
    _event: DeleteIssueEvent
) => (callback: Sender<BoardEvent>, _: Receiver<BoardEvent>) => {
    console.log('Deleting issue...')

    const board: Board = { ..._context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === _event.columnId
    )

    const issueIndex: number = board.columns[columnIndex]?.issues?.findIndex(
        ({ id }) => id === _event.issueId
    )

    if (issueIndex >= 0) {
        board.columns[columnIndex].issues.splice(issueIndex, 1)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}
