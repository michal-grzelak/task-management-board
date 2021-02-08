import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

import { Board } from '@models/Board'

interface BoardProps {
    board?: Board
    state: string
}

const BoardTile: FunctionComponent<BoardProps> = ({
    board,
    state,
}: BoardProps) => {
    if (!board) return <></>

    console.log(state)

    return (
        <Card className={'card'}>
            <CardHeader title={board.title} />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
