import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'
import { boardMachine } from '@machines/Board'
import { BoardEvents, BoardState } from '@machines/Board/constants'

import './style.scss'

const BoardDetailsPage = () => {
    const [state, send] = useMachine(boardMachine, { devTools: true })

    useEffect(() => {
        send(BoardEvents.FETCH)
    }, [])

    const addColumn = () => {
        send(BoardEvents.ADD_COLUMN)
    }

    console.log(state)

    const board = state.context.board

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
            <Grid container>{JSON.stringify(board!)}</Grid>
        </Container>
    )
}

export default BoardDetailsPage
