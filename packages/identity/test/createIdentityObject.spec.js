const metaIdentity = require('../dist/meta-identity')

const account = require('./fixtures/account.json')
const identity = require('./fixtures/identity.json')

describe('@meta.js/identity :: createIdentityObject', () => {
  it('Should create a valid META Identity object', () => {
    const { username } = identity

    const actual = metaIdentity.createIdentityObject(account, username)
    const expected = identity

    expect(actual).toEqual(expected)
  })
})
