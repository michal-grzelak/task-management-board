import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'
import {
    addBoardEvent,
    boardListMachine,
    fetchBoardsEvent,
} from '@machines/BoardList'
import './style.scss'
import BoardTile from '@pages/BoardListPage/components/BoardTile'

const BoardListPage = () => {
    const [state, send] = useMachine(boardListMachine)

    console.log(state)

    useEffect(() => {
        send(fetchBoardsEvent)
    }, [])

    const addBoard = () => send(addBoardEvent)

    const boards = state.context.boards

    return (
        <Container maxWidth={false}>
            <Grid container justify={'center'}>
                <Grid item xs={4} className={'button-create-board'}>
                    <Button onClick={addBoard}>Create Board</Button>
                </Grid>
            </Grid>
            <Grid container>
                {boards.map((board, index) => (
                    <Grid
                        key={`board-item-${index}`}
                        container
                        xs={3}
                        className={'button-create-board'}
                        justify={'center'}
                    >
                        <BoardTile board={board} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default BoardListPage
