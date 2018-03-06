const metaIdentity = require('../dist/meta-identity')

const account = require('./fixtures/account.json')
const graph = require('./fixtures/graph.json')

describe('@meta.js/identity :: createSetGraphInput', () => {
  it('Should create a valid META Graph hash mutation input object', () => {
    const actual = metaIdentity.createSetGraphInput(account, graph.hash)
    const expected = graph

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if hash is undefined', () => {
    const actual = () => metaIdentity.createSetGraphInput(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if hash is not of type string', () => {
    const hash = { hash: graph.hash }

    const actual = () => metaIdentity.createSetGraphInput(account, hash)

    expect(actual).toThrow()
  })

  it('Should throw an error if account is undefined', () => {
    const actual = () => metaIdentity.createSetGraphInput()

    expect(actual).toThrow()
  })

  it('Should throw an error if account is not of type object', () => {
    const actual = () => metaIdentity.createSetGraphInput([account])

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is not of type string', () => {
    account.privateKey = { privateKey: account.privateKey }

    const actual = () => metaIdentity.createSetGraphInput(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is undefined', () => {
    delete account.privateKey

    const actual = () => metaIdentity.createSetGraphInput(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is not of type string', () => {
    account.address = { address: account.address }

    const actual = () => metaIdentity.createSetGraphInput(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is undefined', () => {
    delete account.address

    const actual = () => metaIdentity.createSetGraphInput(account)

    expect(actual).toThrow()
  })
})
