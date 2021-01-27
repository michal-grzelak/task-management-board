import _ from 'lodash'

import { Base } from './Base'
import { IColumn } from './IColumn'
import { IStatus } from './IStatus'

export class Column extends Base implements IColumn {
    title!: string
    statuses!: IStatus[]
    boardId!: string
    id!: string
    createdAt!: Date
    updatedAt!: Date

    constructor(column: IColumn) {
        super()

        if (column) _.assign(this, column)
    }
}
