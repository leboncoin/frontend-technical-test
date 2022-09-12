import React from 'react'
import Footer from '../Footer'
import { render, screen } from '@testing-library/react'
import { getYear } from '@/utils/functions';

describe('Footer Component', () => {
    const year = getYear();
    it('Display properly footer text', () => {
        render(<Footer />);
        expect(screen.getByText(/Lebontest/)).toBeInTheDocument()
    });

    it('Display the good date', () => {
        expect(getYear()).toBe(year)
    })
});