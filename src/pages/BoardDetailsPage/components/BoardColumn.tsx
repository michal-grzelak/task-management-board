import React, { FunctionComponent } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'

import { Column } from '@models/Column'

interface BoardColumnProps {
    column: Column
}

const BoardColumn: FunctionComponent<BoardColumnProps> = ({
    column,
}: BoardColumnProps) => {
    return (
        <Card className={'column'}>
            <CardHeader
                title={column.title}
                subheader={column.id}
                action={
                    <Grid container>
                        <Grid item>
                            <IconButton aria-label="add">
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="delete">
                                <Delete />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
            />
            <CardContent>test</CardContent>
        </Card>
    )
}

export default BoardColumn
