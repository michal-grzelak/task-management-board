import React, { FunctionComponent, MouseEvent } from 'react'
import { CardContent, CardHeader, Grid, IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Delete } from '@material-ui/icons'

import { colors } from '@theme'

import { Board } from '@models/Board'

import { Card } from '@components/Card'

interface BoardProps {
    board?: Board
    state: string
    onDelete: (id: string) => void
}

const BoardTile: FunctionComponent<BoardProps> = ({
    board,
    state,
    onDelete,
}: BoardProps) => {
    const history = useHistory()

    const goToBoard = () => {
        history.push(`/boards/${board!.id}`)
    }

    const deleteBoard = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation()

        onDelete(board!.id)
    }

    console.log(state)

    if (!board) return <></>

    return (
        <Card
            className={'board-tile'}
            onClick={goToBoard}
            style={{
                margin: 10,
                backgroundColor: colors.lightRichBlack,
                cursor: 'pointer',
            }}
        >
            <CardHeader
                title={board.title}
                action={
                    <Grid container>
                        <Grid item>
                            <IconButton
                                aria-label="delete"
                                onClick={deleteBoard}
                            >
                                <Delete />
                            </IconButton>
                        </Grid>{' '}
                    </Grid>
                }
            />
            <CardContent>{board.id}</CardContent>
        </Card>
    )
}

export default BoardTile
