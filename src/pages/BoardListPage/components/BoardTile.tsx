import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

import { useActor } from '@xstate/react'
import { BoardActor } from '@machines/BoardList/context'

interface BoardProps {
    boardActor: BoardActor
}

const BoardTile: FunctionComponent<BoardProps> = ({
    boardActor,
}: BoardProps) => {
    const [state, send] = useActor(boardActor)

    const { board } = state.context

    console.log(state)

    if (!board) return <></>

    return (
        <Card className={'card'}>
            <CardHeader title={board.title} />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
