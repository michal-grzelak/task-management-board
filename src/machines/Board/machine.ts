import { assign, EventObject, Machine, Receiver, Sender, spawn } from 'xstate'
import { BoardContext } from './context'
import { BoardSchema } from './schema'
import {
    AddColumnSuccessEvent,
    BoardEvent,
    FetchBoardSuccessEvent,
} from './events'
import { BoardEvents, BoardState, BoardUpdatingState } from './constants'
import { BoardBuilder } from '@models/builders/BoardBuilder'
import { ColumnBuilder } from '@models/builders/ColumnBuilder'

const initialize = (context: BoardContext, _: BoardEvent) => (
    callback: Sender<any>,
    _: Receiver<EventObject>
) => {
    if (!context.board) callback(BoardEvents.FETCH)
    else callback(BoardEvents.GO_TO_IDLE)
}

const fetchBoardSuccess = assign<BoardContext, FetchBoardSuccessEvent>(
    (context, event) => {
        console.log('Fetch board success!')

        const board = event.data

        return {
            board,
        }
    }
)

const addColumnSuccess = assign<BoardContext, AddColumnSuccessEvent>(
    (context, event) => {
        console.log('Add column success!')

        const column = event.data
        const board = context.board

        board!.columns.push(column)

        return {
            board,
        }
    }
)

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
                        invoke: {
                            id: 'addColumn',
                            src: 'addColumn',
                            onDone: {
                                target: `#board.${BoardState.IDLE}`,
                                actions: addColumnSuccess,
                            },
                            onError: {
                                target: `#board.${BoardState.ERROR}`,
                                actions: 'addColumnFailure',
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
        },
        services: {
            fetchBoard: (context, event) => {
                console.log('Fetching board...')

                return Promise.resolve(
                    new BoardBuilder().withTitle(`Board 1`).build()
                )
            },
            addColumn: (context, event) => {
                console.log('Adding column...')

                return Promise.resolve(
                    new ColumnBuilder()
                        .withTitle(
                            `Column ${context.board!.columns.length + 1}`
                        )
                        .build()
                )
            },
        },
    }
)
