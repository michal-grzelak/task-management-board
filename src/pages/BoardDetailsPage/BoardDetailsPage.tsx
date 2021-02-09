import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { boardMachine, updateBoardEvent } from '@machines/Board'
import { BoardEvents, BoardState } from '@machines/Board/constants'
import { Board } from '@models/Board'

import './style.scss'

const BoardDetailsPage = () => {
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
        send(BoardEvents.ADD_COLUMN)
    }

    const updateName = () => {
        update({ ...board!, title })
    }

    const update = (board: Board) => {
        send(updateBoardEvent(board))
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    console.log(state)

    const isLoading =
        !board ||
        [
            BoardState.INITIALIZING.valueOf(),
            BoardState.FETCHING.valueOf(),
        ].includes(state.value.toString())

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
            <Grid container>
                <Grid container item xs={12}>
                    <Input
                        value={title}
                        onChange={onInputChange}
                        onBlur={updateName}
                    />
                </Grid>
            </Grid>
            <Grid container>{JSON.stringify(board!)}</Grid>
        </Container>
    )
}

export default BoardDetailsPage
