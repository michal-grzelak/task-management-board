import { IBase } from './IBase'
import { IStatus } from './IStatus'
import { CardType } from './CardType'

export interface ICard extends IBase {
    title: string
    status: IStatus
    description: string
    type: CardType
    columnId: string
}
