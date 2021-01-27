import { IBase } from './IBase'
import { IColumn } from './IColumn'

export interface IBoard extends IBase {
    title: string
    columns: IColumn[]
}
