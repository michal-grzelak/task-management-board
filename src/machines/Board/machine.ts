import {
    assign,
    DoneInvokeEvent,
    EventObject,
    Machine,
    Receiver,
    Sender,
} from 'xstate'
import { BoardContext } from './context'
import { BoardSchema } from './schema'
import {
    AddColumnEvent,
    AddIssueEvent,
    BoardEvent,
    DeleteColumnEvent,
    DeleteIssueEvent,
    updateBoardEvent,
    UpdateBoardEvent,
    UpdateColumnEvent,
    UpdateIssueEvent,
} from './events'
import { BoardEvents, BoardState, BoardUpdatingState } from './constants'
import { BoardBuilder } from '@models/builders/BoardBuilder'
import { ColumnBuilder } from '@models/builders/ColumnBuilder'
import { Board } from '@models/Board'

const initialize = (context: BoardContext, _: BoardEvent) => (
    callback: Sender<any>,
    _: Receiver<EventObject>
) => {
    if (!context.board) callback(BoardEvents.FETCH)
    else callback(BoardEvents.GO_TO_IDLE)
}

const fetchBoardSuccess = assign<BoardContext, DoneInvokeEvent<Board>>(
    (context, event) => {
        console.log('Fetch board success!')

        const board = event.data

        return {
            board,
        }
    }
)

const updateBoardSuccess = assign<BoardContext, DoneInvokeEvent<Board>>(
    (context, event) => {
        console.log('Update board success!')

        const board = event.data

        return {
            board,
        }
    }
)

const updateBoard = (context: BoardContext, event: UpdateBoardEvent) => {
    console.log('Updating board...')

    return Promise.resolve(event.board)
}

const addColumn = (context: BoardContext, event: AddColumnEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Adding column...')

    const board = { ...context.board! }

    board.columns.push(event.column)

    callback(updateBoardEvent(board))
}

const updateColumn = (context: BoardContext, event: UpdateColumnEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Updating column...')

    const board = { ...context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === event.column.id
    )

    if (columnIndex >= 0) {
        board.columns[columnIndex] = event.column

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

const deleteColumn = (context: BoardContext, event: DeleteColumnEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Deleting column...')

    const board = { ...context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === event.id
    )

    if (columnIndex >= 0) {
        board.columns.splice(columnIndex, 1)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

const addIssue = (context: BoardContext, event: AddIssueEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Adding issue...')

    const board: Board = { ...context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === event.issue.columnId
    )

    if (columnIndex >= 0) {
        board.columns[columnIndex].issues.push(event.issue)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

const updateIssue = (context: BoardContext, event: UpdateIssueEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Updating issue...')

    const board: Board = { ...context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === event.issue.columnId
    )

    const issueIndex: number = board.columns[columnIndex]?.issues?.findIndex(
        ({ id }) => id === event.issue.id
    )

    if (issueIndex >= 0) {
        board.columns[columnIndex].issues[issueIndex] = event.issue

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

const deleteIssue = (context: BoardContext, event: DeleteIssueEvent) => (
    callback: Sender<BoardEvent>,
    _: Receiver<BoardEvent>
) => {
    console.log('Deleting issue...')

    const board: Board = { ...context.board! }

    const columnIndex: number = board.columns.findIndex(
        ({ id }) => id === event.columnId
    )

    const issueIndex: number = board.columns[columnIndex]?.issues?.findIndex(
        ({ id }) => id === event.issueId
    )

    if (issueIndex >= 0) {
        board.columns[columnIndex].issues.splice(issueIndex, 1)

        callback(updateBoardEvent(board))
    } else callback(BoardEvents.GO_TO_IDLE)
}

export const boardMachine = Machine<BoardContext, BoardSchema, BoardEvent>(
    {
        key: 'board',
        id: 'board',
        initial: BoardState.INITIALIZING,
        context: {
            id: '',
            board: undefined,
        },
        states: {
            [BoardState.IDLE]: {
                on: {
                    [BoardEvents.FETCH]: BoardState.FETCHING,
                    [BoardEvents.ADD_COLUMN]: `${BoardState.UPDATING}.${BoardUpdatingState.ADDING_COLUMN}`,
                    [BoardEvents.UPDATE]: `${BoardState.UPDATING}.${BoardUpdatingState.UPDATING}`,
                },
            },
            [BoardState.INITIALIZING]: {
                on: {
                    [BoardEvents.FETCH]: BoardState.FETCHING,
                    [BoardEvents.GO_TO_IDLE]: BoardState.IDLE,
                },
                invoke: {
                    id: 'initialize',
                    src: initialize,
                },
            },
            [BoardState.FETCHING]: {
                invoke: {
                    id: 'fetchBoard',
                    src: 'fetchBoard',
                    onDone: {
                        target: BoardState.IDLE,
                        actions: fetchBoardSuccess,
                    },
                    onError: {
                        target: BoardState.ERROR,
                        actions: 'fetchBoardError',
                    },
                },
            },
            [BoardState.UPDATING]: {
                states: {
                    [BoardUpdatingState.ADDING_COLUMN]: {
                        on: {
                            [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                            [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                        },
                        invoke: {
                            id: 'addColumn',
                            src: addColumn as any,
                        },
                    },
                    [BoardUpdatingState.UPDATING]: {
                        invoke: {
                            id: 'updateBoard',
                            src: updateBoard as any,
                            onDone: {
                                target: `#board.${BoardState.IDLE}`,
                                actions: updateBoardSuccess,
                            },
                            onError: {
                                target: `#board.${BoardState.ERROR}`,
                                actions: 'updateBoardFailure',
                            },
                        },
                    },
                },
            },
            [BoardState.ERROR]: {},
        },
    },
    {
        actions: {
            fetchBoardFailure: (context, event) => {
                console.log('Fetch board failure!')
            },
            addColumnFailure: (context, event) => {
                console.log('Add column failure!')
            },
            updateBoardFailure: (context, event) => {
                console.log('Update board failure!')
            },
        },
        services: {
            fetchBoard: (context, event) => {
                console.log('Fetching board...')

                return Promise.resolve(
                    new BoardBuilder().withTitle(`Board 1`).build()
                )
            },
            addColumn: (context, _) => (callback, _) => {
                console.log('Adding column...')

                const board = { ...context.board! }

                board.columns.push(
                    new ColumnBuilder()
                        .withBoardId(context.board!.id)
                        .withTitle(
                            `Column ${context.board!.columns.length + 1}`
                        )
                        .build()
                )

                callback(updateBoardEvent(board))
            },
        },
    }
)
