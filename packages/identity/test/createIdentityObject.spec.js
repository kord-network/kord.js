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

  it('Should throw an error if account is undefined', () => {
    const actual = () => metaIdentity.createIdentityObject()

    expect(actual).toThrow()
  })

  it('Should throw an error if account is not of type object', () => {
    const actual = () =>
      metaIdentity.createIdentityObject([account], identity.username)

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is not valid', () => {
    account.address = account.address.slice(2)

    const actual = () =>
      metaIdentity.createIdentityObject(account, identity.username)

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is undefined', () => {
    delete account.address

    const actual = () =>
      metaIdentity.createIdentityObject(account, identity.username)

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is not of type string', () => {
    account.privateKey = { privateKey: account.privateKey }

    const actual = () =>
      metaIdentity.createIdentityObject(account, identity.username)

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is undefined', () => {
    delete account.privateKey

    const actual = () =>
      metaIdentity.createIdentityObject(account, identity.username)

    expect(actual).toThrow()
  })

  it('Should throw an error if username is undefined', () => {
    const actual = () => metaIdentity.createIdentityObject(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if username is not of type string', () => {
    const username = { username: identity.username }

    const actual = () => metaIdentity.createIdentityObject(account, username)

    expect(actual).toThrow()
  })
})
