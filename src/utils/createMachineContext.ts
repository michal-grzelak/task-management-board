import { createContext } from 'react'

import { EventObject, Interpreter, State } from 'xstate'

type StateType<ContextType, EventType extends EventObject> = State<
    ContextType,
    EventType,
    any
>
type SendType<ContextType, EventType extends EventObject> = Interpreter<
    ContextType,
    any,
    EventType
>['send']

export const createMachineContext = <
    ContextType,
    EventType extends EventObject
>() =>
    createContext<{
        state: StateType<ContextType, EventType>
        send: SendType<ContextType, EventType>
    } | null>(null)
