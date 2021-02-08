import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

import { Board } from '@models/Board'

interface BoardProps {
    board: Board
}

const BoardTile: FunctionComponent<BoardProps> = ({ board }: BoardProps) => {
    return (
        <Card className={'card'}>
            <CardHeader title={board.title} />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
