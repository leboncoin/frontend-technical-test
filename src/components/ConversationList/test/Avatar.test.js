import React from 'react'
import Avatar from '../Avatar'
import { render } from '@testing-library/react'
import { displayFirstLetter } from '@/utils/functions';

describe('Avatar component', () => {
    it('Render avatar', () => {
        render(<Avatar />);
    });

    it('Display the good letter if no image provided ', () => {
        render(<Avatar />);
        const result = displayFirstLetter('Test')
        expect(result).toBe('T')
    })
});