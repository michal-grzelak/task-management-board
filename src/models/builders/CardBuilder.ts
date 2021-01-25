import { IBuilder } from './IBuilder'
import { ICard } from '../ICard'
import { Card } from '../Card'
import { IStatus } from '../IStatus'
import { CardType } from '../CardType'
import { Base } from '../Base'

export class CardBuilder implements IBuilder<ICard, Card> {
    private card: ICard

    constructor() {
        this.card = {
            ...new Base(),
            title: '',
            description: '',
            type: CardType.Task,
        }
    }

    build = (): Card => new Card(this.card)

    fromData = (data: ICard): IBuilder<ICard, Card> => {
        this.card = data

        return this
    }

    withTitle = (title: string) => {
        this.card.title = title

        return this
    }

    withStatus = (status: IStatus) => {
        this.card.status = status

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
