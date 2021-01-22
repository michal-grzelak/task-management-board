import { Base } from './Base'
import { Column } from './Column'

export interface Board extends Base {
    title: string
    columns: Column[]
}
