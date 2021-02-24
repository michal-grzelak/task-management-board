import { Machine } from 'xstate'
import { BoardContext } from './context'
import { BoardSchema } from './schema'
import { BoardEvent } from './events'
import { BoardEvents, BoardState, BoardUpdatingState } from './constants'
import {
    addColumn,
    addIssue,
    deleteColumn,
    deleteIssue,
    fetchBoard,
    fetchBoardFailure,
    fetchBoardSuccess,
    initialize,
    updateBoard,
    updateBoardFailure,
    updateBoardSuccess,
    updateColumn,
    updateIssue,
} from './actions'
import { BoardService } from '@services'

export const boardMachine = Machine<BoardContext, BoardSchema, BoardEvent>({
    key: 'board',
    id: 'board',
    initial: BoardState.INITIALIZING,
    context: {
        id: '',
        board: undefined,
        boardService: new BoardService(),
    },
    states: {
        [BoardState.IDLE]: {
            on: {
                [BoardEvents.FETCH]: BoardState.FETCHING,
                [BoardEvents.ADD_COLUMN]: `${BoardState.UPDATING}.${BoardUpdatingState.ADDING_COLUMN}`,
                [BoardEvents.UPDATE_COLUMN]: `${BoardState.UPDATING}.${BoardUpdatingState.UPDATING_COLUMN}`,
                [BoardEvents.DELETE_COLUMN]: `${BoardState.UPDATING}.${BoardUpdatingState.DELETING_COLUMN}`,
                [BoardEvents.ADD_ISSUE]: `${BoardState.UPDATING}.${BoardUpdatingState.ADDING_ISSUE}`,
                [BoardEvents.UPDATE_ISSUE]: `${BoardState.UPDATING}.${BoardUpdatingState.UPDATING_ISSUE}`,
                [BoardEvents.DELETE_ISSUE]: `${BoardState.UPDATING}.${BoardUpdatingState.DELETING_ISSUE}`,
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
                src: fetchBoard,
                onDone: {
                    target: BoardState.IDLE,
                    actions: fetchBoardSuccess,
                },
                onError: {
                    target: BoardState.ERROR,
                    actions: fetchBoardFailure,
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
                [BoardUpdatingState.UPDATING_COLUMN]: {
                    on: {
                        [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                        [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                    },
                    invoke: {
                        id: 'updateColumn',
                        src: updateColumn as any,
                    },
                },
                [BoardUpdatingState.DELETING_COLUMN]: {
                    on: {
                        [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                        [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                    },
                    invoke: {
                        id: 'deleteColumn',
                        src: deleteColumn as any,
                    },
                },
                [BoardUpdatingState.ADDING_ISSUE]: {
                    on: {
                        [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                        [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                    },
                    invoke: {
                        id: 'addIssue',
                        src: addIssue as any,
                    },
                },
                [BoardUpdatingState.UPDATING_ISSUE]: {
                    on: {
                        [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                        [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                    },
                    invoke: {
                        id: 'updateIssue',
                        src: updateIssue as any,
                    },
                },
                [BoardUpdatingState.DELETING_ISSUE]: {
                    on: {
                        [BoardEvents.UPDATE]: BoardUpdatingState.UPDATING,
                        [BoardEvents.GO_TO_IDLE]: `#board.${BoardState.IDLE}`,
                    },
                    invoke: {
                        id: 'deleteIssue',
                        src: deleteIssue as any,
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
                            actions: updateBoardFailure,
                        },
                    },
                },
            },
        },
        [BoardState.ERROR]: {},
    },
})
