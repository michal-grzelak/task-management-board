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
    initialValue: string
    isOpen: boolean
    onCancel: () => void
    onSubmit: (title: string) => void
}

const ColumnModal: FunctionComponent<ColumnModalProps> = ({
    modalTitle,
    initialValue,
    isOpen,
    onCancel,
    onSubmit,
}: ColumnModalProps) => {
    const [title, setTile] = useState(initialValue)

    useEffect(() => {
        if (initialValue !== title) setTile(initialValue)
    }, [initialValue])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTile(event.target.value)
    }

    const handleSubmit = () => {
        onSubmit(title)
    }

    const handleCancel = () => {
        setTile(initialValue)
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
