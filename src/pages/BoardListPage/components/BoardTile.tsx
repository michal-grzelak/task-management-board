import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

import { Board } from '@models/Board'
import { useMachine } from '@xstate/react'
import { boardMachine } from '@machines/Board'

interface BoardProps {
    board: Board
}

const BoardTile: FunctionComponent<BoardProps> = ({ board }: BoardProps) => {
    const [state, send] = useMachine(
        boardMachine.withContext({ id: board.id, board })
    )

    console.log(state)

    return (
        <Card className={'card'}>
            <CardHeader title={board.title} />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
