import { getFirstCharacterCapitalized } from '../getFirstCharacterCapitalized'

describe('getFirstCharacterCapitalized', () => {
  it('should return first letter capitalized', () => {
    const expected = 'E'

    expect(getFirstCharacterCapitalized('Elodie')).toEqual(expected)
  })
})
