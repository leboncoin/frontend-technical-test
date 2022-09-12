import { displayFirstLetter } from '@/utils/functions';

describe('Avatar component ', () => {

    function testDisplayLetter(displayLetter) {
        return displayLetter('Test')
    }

    it('Display the good letter if no image provided ', () => {
        const mockFn = jest.fn(displayFirstLetter)
        const result = testDisplayLetter(mockFn)
        expect(mockFn).toHaveBeenCalled()
        expect(mockFn).toHaveBeenCalledWith('Test')
        expect(result).toBe('T')
    })
});