const metaIdentity = require('../dist/meta-identity')

const { id } = require('./fixtures/id.json')
const identity = require('./fixtures/identity.json')

describe('@meta.js/identity :: getIdFromUsername', () => {
  it('Should generate a META Identity username hash', () => {
    const { username } = identity

    const actual = metaIdentity.getIdFromUsername(username)
    const expected = id

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if username is undefined', () => {
    const actual = () => metaIdentity.getIdFromUsername()

    expect(actual).toThrow()
  })

  it('Should throw an error if username is not of type string', () => {
    const username = { username: identity.username }

    const actual = () => metaIdentity.getIdFromUsername(username)

    expect(actual).toThrow()
  })
})
