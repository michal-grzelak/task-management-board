import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import { useMachine } from '@xstate/react'

import { Button } from '@components/Button'
import { boardListMachine, fetchBoardsEvent } from '@machines/BoardList'
import './style.scss'

const BoardListPage = () => {
    const [state, send] = useMachine(boardListMachine)

    console.log(state)

    useEffect(() => {
        send(fetchBoardsEvent)
    }, [])

    return (
        <Container>
            <Grid container justify={'center'}>
                <Grid item xs={4} className={'button-create-board'}>
                    <Button>Create Board</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BoardListPage
