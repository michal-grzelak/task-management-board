import React, { FunctionComponent, useState } from 'react'
import { CardContent, CardHeader, Grid, IconButton } from '@material-ui/core'
import { Add, Delete, Edit } from '@material-ui/icons'

import { Column } from '@models/Column'

import { colors } from '@theme'
import { useMachineContext } from '@utils'

import { Issue } from '@models/Issue'
import { IssueBuilder } from '@models/builders/IssueBuilder'

import { deleteIssueEvent, updateIssueEvent } from '@machines/Board'
import { Card } from '@components/Card'

import BoardIssue from './BoardIssue'
import ColumnModal from './ColumnModal'
import IssueModal from './IssueModal'

import { BoardMachineContext } from '../utils'

interface BoardColumnProps {
    column: Column
    onDelete: (id: string) => void
    onAddIssue: (issue: Issue) => void
    onUpdate: (column: Column) => void
}

const BoardColumn: FunctionComponent<BoardColumnProps> = ({
    column,
    onDelete,
    onAddIssue,
    onUpdate,
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
        onUpdate({ ...column, title })
    }

    const deleteColumn = () => onDelete(column.id)

    const deleteIssue = (id: string) => {
        send(deleteIssueEvent(id, column.id))
    }

    const updateIssue = (issue: Issue) => {
        send(updateIssueEvent(issue))
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
            <Card
                className={'column'}
                style={{
                    backgroundColor: colors.darkRichBlack,
                    marginRight: 15,
                }}
            >
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
                            onUpdate={updateIssue}
                        />
                    ))}
                </CardContent>
            </Card>
        </>
    )
}

export default BoardColumn
