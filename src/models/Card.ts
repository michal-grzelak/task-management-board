import _ from 'lodash'

import { Base } from './Base'
import { ICard } from './ICard'
import { IStatus } from './IStatus'
import { CardType } from './CardType'

export class Card extends Base implements ICard {
    columnId!: string
    description!: string
    status!: IStatus
    title!: string
    type!: CardType

    constructor(card: ICard) {
        super()

        if (card) _.assign(this, card)
    }
}
