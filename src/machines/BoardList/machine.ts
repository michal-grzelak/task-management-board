import { assign, Machine } from 'xstate'
import { BoardListContext } from './context'
import { BoardListSchema } from './schema'
import { AddBoardSuccessEvent, BoardListEvent } from './events'
import { BoardListEvents, BoardListState } from './constants'
import { BoardBuilder } from '@models/builders/BoardBuilder'

const addBoardSuccess = assign<BoardListContext, AddBoardSuccessEvent>(
    (context, event) => {
        console.log('Add board success!')

        return {
            boards: [...context.boards, event.data],
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
        initial: BoardListState.IDLE,
        context: {
            boards: [],
        },
        states: {
            [BoardListState.IDLE]: {
                on: {
                    [BoardListEvents.FETCH]: BoardListState.FETCHING,
                    [BoardListEvents.ADD]: BoardListState.ADDING,
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
            [BoardListState.ADDING]: {
                invoke: {
                    id: 'addBoard',
                    src: 'addBoard',
                    onDone: {
                        target: BoardListState.IDLE,
                        actions: addBoardSuccess,
                    },
                    onError: {
                        target: BoardListState.ERROR,
                        actions: 'addBoardFailure',
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
                console.log('Fetching...')

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
