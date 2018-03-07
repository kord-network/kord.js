const kordIdentityClaims = require('../dist/kord-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@kord.js/identity-claims :: signMessage', () => {
  it('Should return signature of message', () => {
    const message = claim.claimMessage
    const { privateKey } = account

    const actual = kordIdentityClaims.signMessage(message, privateKey)
    const expected = claim.signature

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if message is undefined', () => {
    const actual = () => kordIdentityClaims.signMessage()

    expect(actual).toThrow()
  })

  it('Should throw an error if message is not of type string', () => {
    const message = { message: claim.claimMessage }

    const actual = () => kordIdentityClaims.signMessage(message)

    expect(actual).toThrow()
  })

  it('Should throw an error if privateKey is undefined', () => {
    const actual = () => kordIdentityClaims.signMessage(claim.claimMessage)

    expect(actual).toThrow()
  })

  it('Should throw an error if privateKey is not of type string', () => {
    const privateKey = { privateKey: account.privateKey }

    const actual = () =>
      kordIdentityClaims.signMessage(claim.claimMessage, privateKey)

    expect(actual).toThrow()
  })
})
