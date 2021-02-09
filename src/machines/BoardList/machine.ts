import { assign, Machine, spawn } from 'xstate'
import { BoardListContext } from './context'
import { BoardListSchema } from './schema'
import { AddBoardSuccessEvent, BoardListEvent } from './events'
import {
    BoardListEvents,
    BoardListState,
    BoardListUpdatingState,
} from './constants'
import { BoardBuilder } from '@models/builders/BoardBuilder'
import { boardMachine } from '@machines/Board'

const addBoardSuccess = assign<BoardListContext, AddBoardSuccessEvent>(
    (context, event) => {
        console.log('Add board success!')

        const board = event.data

        return {
            boards: [
                ...context.boards,
                spawn(
                    boardMachine.withContext({
                        id: board.id,
                        board: board,
                    }),
                    { name: `board-${board.id}` }
                ),
            ],
        }
    }
)

export const boardListMachine = Machine<
    BoardListContext,
    BoardListSchema,
    BoardListEvent
>(
    {
        key: 'boardList',
        id: 'boardList',
        initial: BoardListState.IDLE,
        context: {
            boards: [],
        },
        states: {
            [BoardListState.IDLE]: {
                on: {
                    [BoardListEvents.FETCH]: BoardListState.FETCHING,
                    [BoardListEvents.ADD]: `${BoardListState.UPDATING}.${BoardListUpdatingState.ADDING}`,
                },
            },
            [BoardListState.FETCHING]: {
                invoke: {
                    id: 'fetchBoards',
                    src: 'fetchBoards',
                    onDone: {
                        target: BoardListState.IDLE,
                        actions: 'fetchBoardsSuccess',
                    },
                    onError: {
                        target: BoardListState.ERROR,
                        actions: 'fetchBoardsError',
                    },
                },
            },
            [BoardListState.UPDATING]: {
                states: {
                    [BoardListUpdatingState.ADDING]: {
                        invoke: {
                            id: 'addBoard',
                            src: 'addBoard',
                            onDone: {
                                target: `#boardList.${BoardListState.IDLE}`,
                                actions: addBoardSuccess,
                            },
                            onError: {
                                target: `#boardList.${BoardListState.ERROR}`,
                                actions: 'addBoardFailure',
                            },
                        },
                    },
                },
            },
            [BoardListState.ERROR]: {},
        },
    },
    {
        actions: {
            fetchBoardsSuccess: (context, event) => {
                console.log('Fetch boards success!')
            },
            fetchBoardsFailure: (context, event) => {
                console.log('Fetch boards failure!')
            },
            addBoardFailure: (context, event) => {
                console.log('Add board failure!')
            },
        },
        services: {
            fetchBoards: (context, event) => {
                console.log('Fetching boards...')

                return Promise.resolve([])
            },
            addBoard: (context, event) => {
                console.log('Adding board...')

                return Promise.resolve(
                    new BoardBuilder()
                        .withTitle(`Board ${context.boards.length + 1}`)
                        .build()
                )
            },
        },
    }
)
