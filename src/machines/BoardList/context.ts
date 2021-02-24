import { ActorRefFrom } from 'xstate'

import { boardMachine } from '@machines/Board'
import { IBoardService } from '@services'

export type BoardActor = ActorRefFrom<typeof boardMachine>

export interface BoardListContext {
    boards: BoardActor[]
    boardService: IBoardService
}
