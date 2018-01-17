const metaIdentityClaims = require('../dist/meta-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@meta.js/identity-claims :: verifyIdentityClaim', () => {
  it('Should verify address recovered from META Identity Claim', () => {
    const actual = metaIdentityClaims.verifyIdentityClaim(
      account.address,
      claim.claimHash,
      claim.signature
    )

    const expected = true

    expect(actual).toEqual(expected)
  })
})
