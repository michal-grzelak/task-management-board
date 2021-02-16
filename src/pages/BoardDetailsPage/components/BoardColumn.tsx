import React, { FunctionComponent, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

import { Column } from '@models/Column'

import BoardIssue from './BoardIssue'
import { Issue } from '@models/Issue'
import { IssueBuilder } from '@models/builders/IssueBuilder'
import { useMachineContext } from '@utils'
import { BoardMachineContext } from '@pages/BoardDetailsPage/utils'
import { deleteIssueEvent, updateColumnEvent } from '@machines/Board'

import ColumnModal from './ColumnModal'
import IssueModal from '@pages/BoardDetailsPage/components/IssueModal'

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
    const { send } = useMachineContext({ machine: BoardMachineContext })

    const [editColumnModalVisible, setEditColumnModalVisible] = useState(false)
    const [addIssueModalVisible, setAddIssueModalVisible] = useState(false)

    const addIssue = (title: string, description: string) =>
        onAddIssue(
            new IssueBuilder()
                .withColumnId(column.id)
                .withTitle(title)
                .withDescription(description)
                .build()
        )

    const updateColumn = (title: string) => {
        setEditColumnModalVisible(false)
        send(updateColumnEvent({ ...column, title }))
    }

    const deleteColumn = () => onDelete(column.id)

    const deleteIssue = (id: string) => {
        send(deleteIssueEvent(id, column.id))
    }

    return (
        <>
            <ColumnModal
                modalTitle={'Edit Column'}
                initialTitle={column.title}
                isOpen={editColumnModalVisible}
                onCancel={() => setEditColumnModalVisible(false)}
                onSubmit={updateColumn}
            />
            <IssueModal
                modalTitle={'Add Issue'}
                initialTitle={`Issue ${column.issues.length + 1}`}
                initialDescription={`Description of task: Issue ${
                    column.issues.length + 1
                }`}
                isOpen={addIssueModalVisible}
                onCancel={() => setAddIssueModalVisible(false)}
                onSubmit={addIssue}
            />
            <Card className={'column'}>
                <CardHeader
                    title={column.title}
                    subheader={column.id}
                    action={
                        <Grid container>
                            <Grid item>
                                <IconButton
                                    aria-label="add"
                                    onClick={() =>
                                        setAddIssueModalVisible(true)
                                    }
                                >
                                    <Add />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    aria-label="edit"
                                    onClick={() =>
                                        setEditColumnModalVisible(true)
                                    }
                                >
                                    <Edit />
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
        </>
    )
}

export default BoardColumn
