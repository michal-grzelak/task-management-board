import React from 'react'
import { Container, Grid } from '@material-ui/core'

import { Button } from '@components/Button'
import './style.scss'

const BoardListPage = () => {
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
