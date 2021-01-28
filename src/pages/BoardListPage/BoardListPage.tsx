import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import './style.scss'
import { Button } from '../../components/Button'

const BoardListPage = () => {
    return (
        <Container>
            <Grid container justify={'center'}>
                <Grid
                    item
                    xs={4}
                    justify={'center'}
                    className={'create-button'}
                >
                    <Button>Create Board</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BoardListPage
