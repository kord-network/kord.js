const metaIdentityClaims = require('../dist/meta-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@meta.js/identity-claims :: recoverAddressFromIdentityClaim', () => {
  it('Should recover address from META Identity Claim', () => {
    const actual = metaIdentityClaims.recoverAddressFromIdentityClaim(
      claim.claimHash,
      claim.signature
    )

    const expected = account.address

    expect(actual).toEqual(expected)
  })
})
