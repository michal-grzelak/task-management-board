import React from 'react'
import { render, screen } from '@testing-library/react'
import ExamplePage from './ExamplePage'

test('renders learn react link', () => {
    render(<ExamplePage />)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
