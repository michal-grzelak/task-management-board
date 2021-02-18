import { IBuilder } from './IBuilder'
import { Base } from '../Base'
import { IColumn } from '../IColumn'
import { Column } from '../Column'
import { Issue } from '../Issue'

export class ColumnBuilder implements IBuilder<IColumn, Column> {
    private column: IColumn

    constructor() {
        this.column = {
            ...new Base(),
            title: '',
            issues: [],
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

    withBoardId = (boardId: string) => {
        this.column.boardId = boardId

        return this
    }

    withIssues = (issues: Issue[]) => {
        this.column.issues = issues

        return this
    }
}
