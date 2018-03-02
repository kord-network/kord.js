const metaIdentity = require('../dist/meta-identity')

const account = require('./fixtures/account.json')
const graph = require('./fixtures/graph.json')

describe('@meta.js/identity :: createGraphObject', () => {
  it('Should create a valid META Identity object', () => {
    const actual = metaIdentity.createGraphObject(account.address)
    const expected = { id: graph.id }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if address is not valid', () => {
    const actual = () =>
      metaIdentity.createGraphObject(account.address.slice(2))

    expect(actual).toThrow()
  })

  it('Should throw an error if address is undefined', () => {
    const actual = () => metaIdentity.createGraphObject()

    expect(actual).toThrow()
  })
})
