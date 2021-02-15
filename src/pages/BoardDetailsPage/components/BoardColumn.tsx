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
import { Issue } from '@models/Issue'
import { IssueBuilder } from '@models/builders/IssueBuilder'
import { useMachineContext } from '@utils'
import { BoardMachineContext } from '@pages/BoardDetailsPage/utils'
import { deleteIssueEvent } from '@machines/Board'

interface BoardColumnProps {
    column: Column
    onDelete: (id: string) => void
    onAddIssue: (issue: Issue) => void
}

const BoardColumn: FunctionComponent<BoardColumnProps> = ({
    column,
    onDelete,
    onAddIssue,
}: BoardColumnProps) => {
    const { state, send } = useMachineContext({ machine: BoardMachineContext })

    const addIssue = () =>
        onAddIssue(
            new IssueBuilder()
                .withColumnId(column.id)
                .withTitle(`Title ${column.issues.length + 1}`)
                .withDescription(
                    `Description of task: Title ${column.issues.length + 1}`
                )
                .build()
        )

    const deleteColumn = () => onDelete(column.id)

    const deleteIssue = (id: string) => {
        send(deleteIssueEvent(id, column.id))
    }

    return (
        <Card className={'column'}>
            <CardHeader
                title={column.title}
                subheader={column.id}
                action={
                    <Grid container>
                        <Grid item>
                            <IconButton aria-label="add" onClick={addIssue}>
                                <Add />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                aria-label="delete"
                                onClick={deleteColumn}
                            >
                                <Delete />
                            </IconButton>
                        </Grid>
                    </Grid>
                }
            />
            <CardContent>
                {column.issues.map((issue) => (
                    <BoardIssue
                        key={`issue-${issue.id}`}
                        issue={issue}
                        onDelete={deleteIssue}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

export default BoardColumn
