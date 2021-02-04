import { Machine } from 'xstate'
import { BoardListContext } from './context'
import { BoardListSchema } from './schema'
import { BoardListEvent } from './events'
import { BoardListEvents, BoardListState } from './constants'

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
        },
        services: {
            fetchBoards: (context, event) => {
                console.log('Fetching...')

                return Promise.resolve([])
            },
        },
    }
)
