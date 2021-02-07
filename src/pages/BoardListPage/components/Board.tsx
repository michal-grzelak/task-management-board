import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

interface BoardProps {
    board: object
}

const Board: FunctionComponent<BoardProps> = ({ board }: BoardProps) => {
    return (
        <Card className={'card'}>
            <CardHeader title={'header'} />
            <CardContent>content</CardContent>
        </Card>
    )
}

export default Board
