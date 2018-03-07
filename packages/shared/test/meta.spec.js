const kordShared = require('../dist/kord-shared')

/**
 * @kord.js/shared tests
 */
describe('@kord.js/shared :: KORD_GRAPH_BOOKMARK_CLAIM_PROPERTY', () => {
  it('Should return KORD_GRAPH_BOOKMARK_CLAIM_PROPERTY value', () => {
    const actual = kordShared.KORD_GRAPH_BOOKMARK_CLAIM_PROPERTY
    const expected = 'bookmark.graph'

    expect(actual).toEqual(expected)
  })
})

describe('@kord.js/shared :: KORD_PROFILE_CLAIM_PREFIX', () => {
  it('Should return KORD_PROFILE_CLAIM_PREFIX value', () => {
    const actual = kordShared.KORD_PROFILE_CLAIM_PREFIX
    const expected = 'profile.'

    expect(actual).toEqual(expected)
  })
})
