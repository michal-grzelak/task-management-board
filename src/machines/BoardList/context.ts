import { SpawnedActorRef } from 'xstate'

export interface BoardListContext {
    boards: SpawnedActorRef<any>[]
}
