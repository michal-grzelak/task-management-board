import { IBase } from './IBase'
import { IStatus } from './IStatus'

export interface IColumn extends IBase {
    title: string
    statuses: IStatus[]
    boardId?: string
}
