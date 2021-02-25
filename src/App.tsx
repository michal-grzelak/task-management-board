import React from 'react'
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom'

import { BoardListPage } from '@pages/BoardListPage'
import { BoardDetailsPage } from '@pages/BoardDetailsPage'

function App() {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/boards">Boards</Link>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/boards" />
                    </Route>
                    <Route path="/boards/:id">
                        <BoardDetailsPage />
                    </Route>
                    <Route path="/boards">
                        <BoardListPage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
