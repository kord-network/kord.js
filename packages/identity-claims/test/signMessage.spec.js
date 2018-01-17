const metaIdentityClaims = require('../dist/meta-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@meta.js/identity-claims :: signMessage', () => {
  it('Should return signature of message', () => {
    const message = claim.claimMessage
    const { privateKey } = account

    const actual = metaIdentityClaims.signMessage(message, privateKey)
    const expected = claim.signature

    expect(actual).toEqual(expected)
  })
})
