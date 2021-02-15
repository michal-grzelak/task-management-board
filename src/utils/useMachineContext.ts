import { useContext } from 'react'
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

type MachineReactContextType<
    ContextType,
    EventType extends EventObject
> = React.Context<{
    state: StateType<ContextType, EventType>
    send: SendType<ContextType, EventType>
} | null>

type Props<ContextType, EventType extends EventObject> = {
    machine: MachineReactContextType<ContextType, EventType>
}

export const useMachineContext = <ContextType, EventType extends EventObject>({
    machine,
}: Props<ContextType, EventType>) => {
    const context = useContext(machine)

    if (!context) {
        throw Error('State machine is not initialized')
    }

    return { state: context.state, send: context.send }
}
