import { Base } from './Base'
import { Status } from './Status'
import { CardType } from './CardType'

export interface Card extends Base {
    title: string
    status: Status
    description: string
    type: CardType
    columnId: string
}
