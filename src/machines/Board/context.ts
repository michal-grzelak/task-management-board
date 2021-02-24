import { Board } from '@models/Board'
import { IBoardService } from '@services'

export interface BoardContext {
    id: string
    board?: Board
    boardService: IBoardService
}
