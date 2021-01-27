import React from 'react'
import logo from './logo.svg'
import './ExamplePage.css'

function ExamplePage() {
    return (
        <div className="ExamplePage">
            <header className="ExamplePage-header">
                <img src={logo} className="ExamplePage-logo" alt="logo" />
                <p>
                    Edit <code>src/ExamplePage.tsx</code> and save to reload.
                </p>
                <a
                    className="ExamplePage-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default ExamplePage
