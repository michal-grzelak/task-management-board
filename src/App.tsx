import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'

import { ExamplePage } from '@pages/ExamplePage'
import { BoardListPage } from '@pages/BoardListPage'
import { BoardDetailsPage } from '@pages/BoardDetailsPage'

function App() {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/boards">Boards</Link>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <ExamplePage />
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
