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

  it('Should throw an error if commonName is undefined', () => {
    const actual = () => metaIdentity.getUsernameFromName()

    expect(actual).toThrow()
  })

  it('Should throw an error if commonName is not of type string', () => {
    const commonName = { commonName: name }

    const actual = () => metaIdentity.getUsernameFromName(commonName)

    expect(actual).toThrow()
  })
})
