import { IBuilder } from './IBuilder'
import { IIssue } from '../IIssue'
import { Issue } from '../Issue'
import { CardType } from '../CardType'
import { Base } from '../Base'

export class IssueBuilder implements IBuilder<IIssue, Issue> {
    private card: IIssue

    constructor() {
        this.card = {
            ...new Base(),
            title: '',
            description: '',
            type: CardType.Task,
        }
    }

    build = (): Issue => new Issue(this.card)

    fromData = (data: IIssue): IBuilder<IIssue, Issue> => {
        this.card = data

        return this
    }

    withTitle = (title: string) => {
        this.card.title = title

        return this
    }

    withDescription = (description: string) => {
        this.card.description = description

        return this
    }

    ofType = (type: CardType) => {
        this.card.type = type

        return this
    }

    withColumnId = (columnId: string) => {
        this.card.columnId = columnId

        return this
    }
}
