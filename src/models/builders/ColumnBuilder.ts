import { IBuilder } from './IBuilder'
import { IStatus } from '../IStatus'
import { Base } from '../Base'
import { IColumn } from '../IColumn'
import { Column } from '../Column'

export class ColumnBuilder implements IBuilder<IColumn, Column> {
    private column: IColumn

    constructor() {
        this.column = {
            ...new Base(),
            title: '',
            statuses: [],
        }
    }

    build = (): Column => new Column(this.column)

    fromData = (data: IColumn): IBuilder<IColumn, Column> => {
        this.column = data

        return this
    }

    withTitle = (title: string) => {
        this.column.title = title

        return this
    }

    withStatuses = (statuses: IStatus[]) => {
        this.column.statuses = statuses

        return this
    }
}
