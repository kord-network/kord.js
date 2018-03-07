const kord = require('../dist/kord')

/**
 * kord.js tests
 */
describe('kord.js :: @kord.js/identity-claims', () => {
  it('Should export @kord.js/identity-claims module', () => {
    const actual = kord.identityClaims

    expect(actual).toBeDefined()
  })
})

describe('kord.js :: @kord.js/identity', () => {
  it('Should export @kord.js/identity module', () => {
    const actual = kord.identity

    expect(actual).toBeDefined()
  })
})

describe('kord.js :: @kord.js/shared', () => {
  it('Should export @kord.js/shared module', () => {
    const actual = kord.shared

    expect(actual).toBeDefined()
  })
})
