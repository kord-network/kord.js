const metaIdentity = require('../dist/meta-identity')

const identity = require('./fixtures/identity.json')
const { name } = require('./fixtures/name.json')

describe('@meta.js/identity :: getUsernameFromName', () => {
  it('Should generate a META Identity username', () => {
    const commonName = name
    const { username } = identity

    const actual = metaIdentity.getUsernameFromName(commonName)
    const expected = username

    expect(actual).toEqual(expected)
  })
})
