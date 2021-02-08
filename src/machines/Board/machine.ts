import { EventObject, Machine, Receiver, Sender } from 'xstate'
import { BoardContext } from './context'
import { BoardSchema } from './schema'
import { BoardEvent } from './events'
import { BoardEvents, BoardState } from './constants'

const initialize = (context: BoardContext, _: BoardEvent) => (
    callback: Sender<any>,
    _: Receiver<EventObject>
) => {
    if (!context.board) callback(BoardEvents.FETCH)
    else callback(BoardEvents.GO_TO_IDLE)
}

export const boardMachine = Machine<BoardContext, BoardSchema, BoardEvent>(
    {
        key: 'board',
        initial: BoardState.INITIALIZING,
        context: {
            id: '',
            board: undefined,
        },
        states: {
            [BoardState.IDLE]: {
                on: {
                    [BoardEvents.FETCH]: BoardState.FETCHING,
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
                        actions: 'fetchBoardSuccess',
                    },
                    onError: {
                        target: BoardState.ERROR,
                        actions: 'fetchBoardError',
                    },
                },
            },
            [BoardState.ERROR]: {},
        },
    },
    {
        actions: {
            fetchBoardSuccess: (context, event) => {
                console.log('Fetch board success!')
            },
            fetchBoardFailure: (context, event) => {
                console.log('Fetch board failure!')
            },
        },
        services: {
            fetchBoard: (context, event) => {
                console.log('Fetching...')

                return Promise.resolve(null)
            },
        },
    }
)
