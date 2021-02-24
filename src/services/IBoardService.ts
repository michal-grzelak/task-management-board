import { Board } from '@models/Board'
import { ILocalStorageService } from './ILocalStorageService'

export interface IBoardService {
    apiService: ILocalStorageService

    getBoards: () => Board[]

    getBoard: (id: string) => Board | null

    addBoard: (board: Board) => Board | null

    updateBoard: (board: Board) => Board | null

    deleteBoard: (id: string) => Board | null
}
