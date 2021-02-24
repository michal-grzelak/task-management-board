import React, { FunctionComponent, useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'

import {
    addBoardEvent,
    boardListMachine,
    deleteBoardEvent,
} from '@machines/BoardList'
import { BoardListEvents } from '@machines/BoardList/constants'

import BoardTile from './components/BoardTile'

import './style.scss'

const BoardListPage: FunctionComponent = () => {
    const [state, send] = useMachine(boardListMachine, { devTools: true })

    console.log(state)

    useEffect(() => {
        send(BoardListEvents.FETCH)
    }, [])

    const addBoard = () => send(addBoardEvent)

    const deleteBoard = (id: string) => {
        send(deleteBoardEvent(id))
    }

    const boards = state.context.boards

    return (
        <Container maxWidth={false}>
            <Grid container>
                <Grid container item xs={12} justify={'center'}>
                    <Button onClick={addBoard}>Create Board</Button>
                </Grid>
            </Grid>
            <Grid container>
                {boards.map((board, index) => (
                    <Grid
                        key={`board-tile-${index}`}
                        container
                        item
                        xs={3}
                        justify={'center'}
                    >
                        <BoardTile
                            board={board.state.context.board}
                            state={board.state.value.toString()}
                            onDelete={deleteBoard}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default BoardListPage
