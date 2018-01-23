const metaShared = require('../dist/meta-shared')
const pkg = require('../package.json')

/**
 * @meta.js/shared tests
 */
describe('@meta.js/shared :: META_ID_PROFILE_CLAIM_PREFIX', () => {
  it('Should return META_ID_PROFILE_CLAIM_PREFIX value', () => {
    const actual = metaShared.META_ID_PROFILE_CLAIM_PREFIX
    const expected = 'profile.'

    expect(actual).toEqual(expected)
  })
})

describe('@meta.js/shared :: META_ID_USERNAME_SUFFIX', () => {
  it('Should return META_ID_USERNAME_SUFFIX value', () => {
    const actual = metaShared.META_ID_USERNAME_SUFFIX
    const expected = '.id.meta'

    expect(actual).toEqual(expected)
  })
})

describe('@meta.js/shared :: version', () => {
  it('Should return current library version', () => {
    const actual = metaShared.version
    const expected = pkg.version

    expect(actual).toEqual(expected)
  })
})
