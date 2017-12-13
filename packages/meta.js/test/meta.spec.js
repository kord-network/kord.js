const meta = require('../dist/meta')

/**
 * meta.js tests
 */
describe('meta.js :: @meta.js/claims', () => {
  it('Should export @meta.js/claims module', () => {
    const actual = meta.claims

    expect(actual).toBeDefined()
  })
})

describe('meta.js :: @meta.js/id', () => {
  it('Should export @meta.js/id module', () => {
    const actual = meta.id

    expect(actual).toBeDefined()
  })
})
