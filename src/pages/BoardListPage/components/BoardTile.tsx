import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { Board } from '@models/Board'

interface BoardProps {
    board?: Board
    state: string
}

const BoardTile: FunctionComponent<BoardProps> = ({
    board,
    state,
}: BoardProps) => {
    const history = useHistory()

    const goToBoard = () => {
        history.push(`/boards/${board!.id}`)
    }

    console.log(state)

    if (!board) return <></>

    return (
        <Card className={'board-tile'} onClick={goToBoard}>
            <CardHeader title={board.title} />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
