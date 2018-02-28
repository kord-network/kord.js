const metaShared = require('../dist/meta-shared')

/**
 * @meta.js/shared tests
 */
describe('@meta.js/shared :: META_ID_FOLLOW_CLAIM_PROPERTY', () => {
  it('Should return META_ID_FOLLOW_CLAIM_PROPERTY value', () => {
    const actual = metaShared.META_ID_FOLLOW_CLAIM_PROPERTY
    const expected = 'follow.id'

    expect(actual).toEqual(expected)
  })
})

describe('@meta.js/shared :: META_ID_PROFILE_CLAIM_PREFIX', () => {
  it('Should return META_ID_PROFILE_CLAIM_PREFIX value', () => {
    const actual = metaShared.META_ID_PROFILE_CLAIM_PREFIX
    const expected = 'profile.'

    expect(actual).toEqual(expected)
  })
})
