import { assign, spawn } from 'xstate'

import { boardMachine } from '@machines/Board'
import { BoardBuilder } from '@models/builders/BoardBuilder'

import { BoardListContext } from './context'
import { AddBoardSuccessEvent, BoardListEvent } from './events'

export const addBoardSuccess = assign<BoardListContext, AddBoardSuccessEvent>(
    (_context, _event) => {
        console.log('Add board success!')

        const board = _event.data

        return {
            boards: [
                ..._context.boards,
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

export const fetchBoardsSuccess = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Fetch boards success!')
}

export const fetchBoardsFailure = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Fetch boards failure!')
}

export const addBoardFailure = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Add board failure!')
}

export const fetchBoards = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Fetching boards...')

    return Promise.resolve([])
}

export const addBoard = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Adding board...')

    return Promise.resolve(
        new BoardBuilder()
            .withTitle(`Board ${_context.boards.length + 1}`)
            .build()
    )
}
