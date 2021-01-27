import { IBuilder } from './IBuilder'
import { Base } from '../Base'
import { IBoard } from '../IBoard'
import { Board } from '../Board'
import { IColumn } from '../IColumn'

export class BoardBuilder implements IBuilder<IBoard, Board> {
    private board: IBoard

    constructor() {
        this.board = {
            ...new Base(),
            title: '',
            columns: [],
        }
    }

    build = (): Board => new Board(this.board)

    fromData = (data: IBoard): IBuilder<IBoard, Board> => {
        this.board = data

        return this
    }

    withTitle = (title: string) => {
        this.board.title = title

        return this
    }

    withColumns = (columns: IColumn[]) => {
        this.board.columns = columns

        return this
    }
}
