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

import { Button } from '@components/Button'

interface ColumnModalProps {
    modalTitle: string
    initialTitle: string
    isOpen: boolean
    onCancel: () => void
    onSubmit: (title: string) => void
}

const ColumnModal: FunctionComponent<ColumnModalProps> = ({
    modalTitle,
    initialTitle,
    isOpen,
    onCancel,
    onSubmit,
}: ColumnModalProps) => {
    const [title, setTile] = useState(initialTitle)

    useEffect(() => {
        if (initialTitle !== title) setTile(initialTitle)
    }, [initialTitle])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTile(event.target.value)
    }

    const handleSubmit = () => {
        onSubmit(title)
        onCancel()
    }

    const handleCancel = () => {
        setTile(initialTitle)
        onCancel()
    }

    return (
        <Dialog open={isOpen} onClose={handleCancel}>
            <DialogTitle id="column-modal">{modalTitle}</DialogTitle>
            <DialogContent style={{ width: 300 }}>
                <DialogContentText>Provide Column details</DialogContentText>
                <TextField
                    value={title}
                    onChange={handleInputChange}
                    id="title"
                    label="Column title"
                    type="text"
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
