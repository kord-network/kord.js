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
})
