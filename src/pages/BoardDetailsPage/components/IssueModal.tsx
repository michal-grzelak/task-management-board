import React, {
    ChangeEvent,
    FunctionComponent,
    useEffect,
    useState,
} from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core'

import { colors } from '@theme'

import { Button } from '@components/Button'

interface ColumnModalProps {
    modalTitle: string
    initialTitle: string
    initialDescription: string
    isOpen: boolean
    onCancel: () => void
    onSubmit: (title: string, description: string) => void
}

const ColumnModal: FunctionComponent<ColumnModalProps> = ({
    modalTitle,
    initialTitle,
    initialDescription,
    isOpen,
    onCancel,
    onSubmit,
}: ColumnModalProps) => {
    const [title, setTile] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)

    useEffect(() => {
        if (initialTitle !== title) setTile(initialTitle)
        if (initialDescription !== description)
            setDescription(initialDescription)
    }, [initialTitle, initialDescription])

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTile(event.target.value)
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleSubmit = () => {
        onSubmit(title, description)
        onCancel()
    }

    const handleCancel = () => {
        setTile(initialTitle)
        setDescription(initialDescription)
        onCancel()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancel}
            PaperProps={{
                style: { backgroundColor: colors.lightRichBlack },
                variant: 'outlined',
            }}
        >
            <DialogTitle id="issue-modal">{modalTitle}</DialogTitle>
            <DialogContent style={{ width: 300 }}>
                <DialogContentText>Provide Issue details</DialogContentText>
                <TextField
                    value={title}
                    onChange={handleTitleChange}
                    id="title"
                    label="Issue title"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={description}
                    onChange={handleDescriptionChange}
                    id="description"
                    label="Issue description"
                    type="text"
                    multiline
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ColumnModal
