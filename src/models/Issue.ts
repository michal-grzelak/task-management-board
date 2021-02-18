import _ from 'lodash'

import { Base } from './Base'
import { IIssue } from './IIssue'
import { CardType } from './CardType'

export class Issue extends Base implements IIssue {
    columnId!: string
    description!: string
    title!: string
    type!: CardType

    constructor(card: IIssue) {
        super()

        if (card) _.assign(this, card)
    }
}
