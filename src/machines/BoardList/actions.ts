import { assign, spawn } from 'xstate'

import { boardMachine } from '@machines/Board'
import { BoardBuilder } from '@models/builders/BoardBuilder'

import { BoardListContext } from './context'
import {
    AddBoardSuccessEvent,
    BoardListEvent,
    DeleteBoardEvent,
    DeleteBoardSuccessEvent,
} from './events'

export const fetchBoards = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Fetching boards...')

    return Promise.resolve([])
}

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

export const addBoardFailure = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Add board failure!')
}

export const deleteBoard = (
    _context: BoardListContext,
    _event: DeleteBoardEvent
) => {
    console.log('Deleting board...')

    return Promise.resolve(_event.id)
}

export const deleteBoardSuccess = assign<
    BoardListContext,
    DeleteBoardSuccessEvent
>((_context, _event) => {
    console.log('Delete board success!')

    const index = _context.boards.findIndex(
        ({ id }) => id === `board-${_event.data}`
    )

    if (index >= 0) {
        _context.boards[index].stop!()

        _context.boards.splice(index, 1)
    }

    return {
        boards: _context.boards,
    }
})

export const deleteBoardFailure = (
    _context: BoardListContext,
    _event: BoardListEvent
) => {
    console.log('Delete board failure!')
}
