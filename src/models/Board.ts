import _ from 'lodash'

import { Base } from './Base'
import { IBoard } from './IBoard'
import { Column } from './Column'

export class Board extends Base implements IBoard {
    title: string = ''
    columns: Column[] = []

    constructor(board: IBoard) {
        super()

        if (board) _.assign(this, board)
    }
}
