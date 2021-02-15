import React, { FunctionComponent } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { Issue } from '@models/Issue'

interface BoardIssueProps {
    issue: Issue
    onDelete: (id: string) => void
}

const BoardIssue: FunctionComponent<BoardIssueProps> = ({
    issue,
    onDelete,
}: BoardIssueProps) => {
    const deleteIssue = () => onDelete(issue.id)

    return (
        <Card className={'issue'}>
            <CardHeader
                title={issue.title}
                subheader={issue.type}
                action={
                    <Grid container>
                        <Grid item>
                            <IconButton aria-label="edit">
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
            <CardContent>test</CardContent>
        </Card>
    )
}

export default BoardIssue
