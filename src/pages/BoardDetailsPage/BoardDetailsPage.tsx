import React, {
    ChangeEvent,
    FunctionComponent,
    useEffect,
    useState,
} from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { addColumnEvent, boardMachine, updateBoardEvent } from '@machines/Board'
import { BoardEvents, BoardState } from '@machines/Board/constants'

import { Board } from '@models/Board'

import BoardColumn from './components/BoardColumn'

import './style.scss'
import { ColumnBuilder } from '@models/builders/ColumnBuilder'

const BoardDetailsPage: FunctionComponent = () => {
    const [state, send] = useMachine(boardMachine, { devTools: true })
    const board = state.context.board

    const [title, setTitle] = useState(board?.title ?? '')

    useEffect(() => {
        send(BoardEvents.FETCH)
    }, [])

    useEffect(() => {
        setTitle(board?.title ?? '')
    }, [board])

    const addColumn = () => {
        send(
            addColumnEvent(
                new ColumnBuilder()
                    .withBoardId(board!.id)
                    .withTitle(`Column ${board!.columns.length + 1}`)
                    .build()
            )
        )
    }

    const updateName = () => {
        update({ ...board!, title })
        setTitle(board!.title)
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const update = (board: Board) => {
        send(updateBoardEvent(board))
    }

    console.log(state)

    const isLoading =
        !board ||
        state.matches(BoardState.INITIALIZING) ||
        state.matches(BoardState.FETCHING)

    if (isLoading)
        return (
            <Container maxWidth={false}>
                <Grid container>
                    <Grid container item xs={12} justify={'center'}>
                        Loading...
                    </Grid>
                </Grid>
            </Container>
        )

    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid container item xs={12} justify={'center'}>
                    <Button onClick={addColumn}>Add column</Button>
                </Grid>
            </Grid>
            <Grid container style={{ marginBottom: 50 }}>
                <Grid container item xs={12}>
                    <Input
                        value={title}
                        onChange={onInputChange}
                        onBlur={updateName}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid container item xs={12}>
                    <Box style={{ overflowX: 'auto', display: 'flex' }}>
                        {board!.columns.map((column) => (
                            <BoardColumn
                                key={`column-${column.id}`}
                                column={column}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BoardDetailsPage
