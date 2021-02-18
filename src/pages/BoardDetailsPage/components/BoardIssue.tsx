import React, { FunctionComponent, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { Issue } from '@models/Issue'

import IssueModal from './IssueModal'

interface BoardIssueProps {
    issue: Issue
    onDelete: (id: string) => void
    onUpdate: (issue: Issue) => void
}

const BoardIssue: FunctionComponent<BoardIssueProps> = ({
    issue,
    onDelete,
    onUpdate,
}: BoardIssueProps) => {
    const [editIssueModalVisible, setEditIssueModalVisible] = useState(false)

    const deleteIssue = () => onDelete(issue.id)

    const updateIssue = (title: string, description: string) => {
        onUpdate({ ...issue, title, description })
    }

    return (
        <>
            <IssueModal
                modalTitle={'Edit Issue'}
                initialTitle={issue.title}
                initialDescription={issue.description}
                isOpen={editIssueModalVisible}
                onCancel={() => setEditIssueModalVisible(false)}
                onSubmit={updateIssue}
            />
            <Card className={'issue'}>
                <CardHeader
                    title={issue.title}
                    subheader={issue.type}
                    action={
                        <Grid container>
                            <Grid item>
                                <IconButton
                                    aria-label="edit"
                                    onClick={() =>
                                        setEditIssueModalVisible(true)
                                    }
                                >
                                    <Edit />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    aria-label="delete"
                                    onClick={deleteIssue}
                                >
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                />
                <CardContent>{issue.description}</CardContent>
            </Card>
        </>
    )
}

export default BoardIssue
