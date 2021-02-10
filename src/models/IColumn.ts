import { IBase } from './IBase'
import { IIssue } from './IIssue'

export interface IColumn extends IBase {
    title: string
    issues: IIssue[]
    boardId?: string
}
