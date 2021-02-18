import { ActorRefFrom } from 'xstate'

import { boardMachine } from '@machines/Board'

export type BoardActor = ActorRefFrom<typeof boardMachine>

export interface BoardListContext {
    boards: BoardActor[]
}
