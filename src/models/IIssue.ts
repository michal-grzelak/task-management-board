import { IBase } from './IBase'
import { CardType } from './CardType'

export interface IIssue extends IBase {
    title: string
    description: string
    type: CardType
    columnId?: string
}
