import React, { FunctionComponent } from 'react'
import { Card, CardContent, CardHeader } from '@material-ui/core'

import { Column } from '@models/Column'

interface BoardColumnProps {
    column: Column
}

const BoardColumn: FunctionComponent<BoardColumnProps> = ({
    column,
}: BoardColumnProps) => {
    return (
        <Card className={'column'}>
            <CardHeader title={column.title} subheader={column.id} />
            <CardContent>test</CardContent>
        </Card>
    )
}

export default BoardColumn
