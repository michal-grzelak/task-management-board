import { createMachineContext } from '@utils'
import { BoardContext } from '@machines/Board/context'
import { BoardEvent } from '@machines/Board'

export const BoardMachineContext = createMachineContext<
    BoardContext,
    BoardEvent
>()
