import { Base } from './Base'
import { Status } from './Status'

export interface Column extends Base {
    title: string
    statuses: Status[]
    boardId: string
}
