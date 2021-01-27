import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import { ExamplePage } from './pages/ExamplePage'

function App() {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <ExamplePage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
