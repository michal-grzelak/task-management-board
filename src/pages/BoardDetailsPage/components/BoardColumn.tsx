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

import BoardIssue from './BoardIssue'

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
            <CardContent>
                {column.issues.map((issue) => (
                    <BoardIssue key={`issue-${issue.id}`} issue={issue} />
                ))}
            </CardContent>
        </Card>
    )
}

export default BoardColumn
