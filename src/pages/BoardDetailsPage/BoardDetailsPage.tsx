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

import {
    addColumnEvent,
    addIssueEvent,
    boardMachine,
    deleteColumnEvent,
    updateBoardEvent,
} from '@machines/Board'
import { BoardEvents, BoardState } from '@machines/Board/constants'

import { Board } from '@models/Board'

import BoardColumn from './components/BoardColumn'
import ColumnModal from './components/ColumnModal'

import './style.scss'
import { ColumnBuilder } from '@models/builders/ColumnBuilder'
import { Issue } from '@models/Issue'
import { BoardMachineContext } from './utils'

const BoardDetailsPage: FunctionComponent = () => {
    const [state, send] = useMachine(boardMachine, { devTools: true })
    const board = state.context.board

    const [title, setTitle] = useState(board?.title ?? '')

    const [addColumnModalVisible, setAddColumnModalVisible] = useState(false)

    useEffect(() => {
        send(BoardEvents.FETCH)
    }, [])

    useEffect(() => {
        setTitle(board?.title ?? '')
    }, [board])

    const addColumn = (title: string) => {
        setAddColumnModalVisible(false)
        send(
            addColumnEvent(
                new ColumnBuilder()
                    .withBoardId(board!.id)
                    .withTitle(title)
                    .build()
            )
        )
    }

    const deleteColumn = (id: string) => {
        send(deleteColumnEvent(id))
    }

    const addIssue = (issue: Issue) => {
        send(addIssueEvent(issue))
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
        <>
            <ColumnModal
                modalTitle={'Add Column'}
                initialTitle={`Column ${board!.columns.length + 1}`}
                isOpen={addColumnModalVisible}
                onCancel={() => setAddColumnModalVisible(false)}
                onSubmit={addColumn}
            />
            <Container maxWidth={false}>
                <Grid container>
                    <Grid container item xs={12} justify={'center'}>
                        <Button onClick={() => setAddColumnModalVisible(true)}>
                            Add column
                        </Button>
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
                            <BoardMachineContext.Provider
                                value={{ state, send }}
                            >
                                {board!.columns.map((column) => (
                                    <BoardColumn
                                        key={`column-${column.id}`}
                                        column={column}
                                        onDelete={deleteColumn}
                                        onAddIssue={addIssue}
                                    />
                                ))}
                            </BoardMachineContext.Provider>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default BoardDetailsPage
