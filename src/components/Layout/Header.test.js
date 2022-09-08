import React from 'react'
import Header from './Header'
import { render, screen } from '@testing-library/react'

describe('Header Compenent', () => {
    it('Display properly header title', () => {
        render(<Header/>);
        expect(screen.getByText('Lebontest')).toBeInTheDocument()
    });
});