const metaIdentity = require('../dist/meta-identity')

const { graph } = require('./fixtures/graph.json')
const identity = require('./fixtures/identity.json')

describe('@meta.js/identity :: getClaimsGraphFromUsername', () => {
  it('Should generate a META Claims Graph name', () => {
    const { username } = identity

    const actual = metaIdentity.getClaimsGraphFromUsername(username)
    const expected = graph

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if username is undefined', () => {
    const actual = () => metaIdentity.getClaimsGraphFromUsername()

    expect(actual).toThrow()
  })

  it('Should throw an error if username is not of type string', () => {
    const username = { username: identity.username }

    const actual = () => metaIdentity.getClaimsGraphFromUsername(username)

    expect(actual).toThrow()
  })
})
