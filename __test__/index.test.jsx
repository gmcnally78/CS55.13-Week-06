// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  it('renders a List of Cars', () => {
    render(<h1>List of Cars</h1>)

    const carHeading = screen.getByRole('heading', {
      name: /List of Cars/i,
    })

    expect(carHeading).toBeInTheDocument()
  })
})
