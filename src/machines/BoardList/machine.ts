import { Machine } from 'xstate'
import { BoardListContext } from './context'
import { BoardListSchema } from './schema'
import { BoardListEvent } from './events'
import {
    BoardListEvents,
    BoardListState,
    BoardListUpdatingState,
} from './constants'

import {
    addBoard,
    addBoardFailure,
    addBoardSuccess,
    deleteBoard,
    deleteBoardFailure,
    deleteBoardSuccess,
    fetchBoards,
    fetchBoardsFailure,
    fetchBoardsSuccess,
} from '@machines/BoardList/actions'
import { BoardService } from '@services'

export const boardListMachine = Machine<
    BoardListContext,
    BoardListSchema,
    BoardListEvent
>({
    key: 'boardList',
    id: 'boardList',
    initial: BoardListState.IDLE,
    context: {
        boards: [],
        boardService: new BoardService(),
    },
    states: {
        [BoardListState.IDLE]: {
            on: {
                [BoardListEvents.FETCH]: BoardListState.FETCHING,
                [BoardListEvents.ADD]: `${BoardListState.UPDATING}.${BoardListUpdatingState.ADDING}`,
                [BoardListEvents.DELETE]: `${BoardListState.UPDATING}.${BoardListUpdatingState.DELETING}`,
            },
        },
        [BoardListState.FETCHING]: {
            invoke: {
                id: 'fetchBoards',
                src: fetchBoards,
                onDone: {
                    target: BoardListState.IDLE,
                    actions: fetchBoardsSuccess,
                },
                onError: {
                    target: BoardListState.ERROR,
                    actions: fetchBoardsFailure,
                },
            },
        },
        [BoardListState.UPDATING]: {
            states: {
                [BoardListUpdatingState.ADDING]: {
                    invoke: {
                        id: 'addBoard',
                        src: addBoard,
                        onDone: {
                            target: `#boardList.${BoardListState.IDLE}`,
                            actions: addBoardSuccess,
                        },
                        onError: {
                            target: `#boardList.${BoardListState.ERROR}`,
                            actions: addBoardFailure,
                        },
                    },
                },
                [BoardListUpdatingState.DELETING]: {
                    invoke: {
                        id: 'deleteBoard',
                        src: deleteBoard as any,
                        onDone: {
                            target: `#boardList.${BoardListState.IDLE}`,
                            actions: deleteBoardSuccess,
                        },
                        onError: {
                            target: `#boardList.${BoardListState.ERROR}`,
                            actions: deleteBoardFailure,
                        },
                    },
                },
            },
        },
        [BoardListState.ERROR]: {},
    },
})
