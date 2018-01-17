const metaIdentityClaims = require('../dist/meta-identity-claims')

const issuer = require('./fixtures/issuer.json')
const profileClaim = require('./fixtures/profile-claim.json')
const verifiedProfileClaim = require('./fixtures/verified-profile-claim.json')

describe('@meta.js/identity-claims :: createProfileMetaIdentityClaim', () => {
  it('Should return a valid profile META Identity Claim object', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = metaIdentityClaims.createProfileMetaIdentityClaim(
      claimMessage,
      issuer,
      subProperty
    )

    const expected = {
      claim: claimMessage,
      issuer: issuer.id,
      property: verifiedProfileClaim.property,
      signature: verifiedProfileClaim.signature,
      subject: issuer.id,
    }

    expect(actual).toEqual(expected)
  })
})
