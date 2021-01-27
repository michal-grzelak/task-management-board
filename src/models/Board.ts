import _ from 'lodash'

import { Base } from './Base'
import { IBoard } from './IBoard'
import { IColumn } from './IColumn'

export class Board extends Base implements IBoard {
    title!: string
    columns!: IColumn[]

    constructor(board: IBoard) {
        super()

        if (board) _.assign(this, board)
    }
}
