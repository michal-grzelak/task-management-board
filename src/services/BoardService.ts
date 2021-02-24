import { Board } from '@models/Board'

import { IBoardService } from './IBoardService'
import { ILocalStorageService } from './ILocalStorageService'
import { LocalStorageService } from '@services/LocalStorageService'

export class BoardService implements IBoardService {
    apiService: ILocalStorageService
    boardsKey = 'BOARDS' as const

    constructor(apiService = new LocalStorageService()) {
        this.apiService = apiService
    }

    getBoards(): Board[] {
        return this.apiService.get<Board[]>(this.boardsKey) ?? []
    }

    getBoard(id: string): Board | null {
        const boards = this.getBoards()

        return boards.find(({ id: boardId }) => boardId === id) ?? null
    }

    updateBoard(board: Board): Board | null {
        const boards = this.getBoards()

        const boardIndex = boards.findIndex(({ id }) => id === board.id)

        if (boardIndex >= 0) {
            boards[boardIndex] = board

            const result = this.apiService.set<Board[]>(this.boardsKey, boards)

            return result ? result[boardIndex] : null
        }

        return null
    }

    addBoard(board: Board): Board | null {
        const boards = this.getBoards()

        boards.push(board)

        const result = this.apiService.set<Board[]>(this.boardsKey, boards)

        return result ? board : null
    }

    deleteBoard(id: string): Board | null {
        const boards = this.getBoards()

        const boardIndex = boards.findIndex(({ id: boardId }) => boardId === id)

        if (boardIndex >= 0) {
            boards.splice(boardIndex, 1)

            const result = this.apiService.set<Board[]>(this.boardsKey, boards)

            return result ? result[boardIndex] : null
        }

        return null
    }
}
