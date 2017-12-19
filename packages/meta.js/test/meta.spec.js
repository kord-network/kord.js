const meta = require('../dist/meta')

/**
 * meta.js tests
 */
describe('meta.js :: @meta.js/identity-claims', () => {
  it('Should export @meta.js/identity-claims module', () => {
    const actual = meta.identityClaims

    expect(actual).toBeDefined()
  })
})

describe('meta.js :: @meta.js/identity', () => {
  it('Should export @meta.js/identity module', () => {
    const actual = meta.identity

    expect(actual).toBeDefined()
  })
})
