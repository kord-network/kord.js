const kordIdentity = require('../dist/kord-identity')

const account = require('./fixtures/account.json')
const graph = require('./fixtures/graph.json')

describe('@kord.js/identity :: createGraphObject', () => {
  it('Should create a valid KORD Graph object', () => {
    const actual = kordIdentity.createGraphObject(account.address)
    const expected = { id: graph.id }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if address is not valid', () => {
    const actual = () =>
      kordIdentity.createGraphObject(account.address.slice(2))

    expect(actual).toThrow()
  })

  it('Should throw an error if address is undefined', () => {
    const actual = () => kordIdentity.createGraphObject()

    expect(actual).toThrow()
  })
})
