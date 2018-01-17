const metaIdentityClaims = require('../dist/meta-identity-claims')

const claim = require('./fixtures/claim.json')
const issuer = require('./fixtures/issuer.json')
const subject = require('./fixtures/subject.json')
const verifiedClaim = require('./fixtures/verified-claim.json')

describe('@meta.js/identity-claims :: createVerifiedIdentityClaimObject', () => {
  it('Should return a valid verified META Identity Claim object', () => {
    const actual = metaIdentityClaims.createVerifiedIdentityClaimObject(
      claim.claimMessage,
      issuer,
      claim.property,
      subject.id
    )

    const expected = {
      claim: claim.claimMessage,
      issuer: issuer.id,
      property: claim.property,
      signature: verifiedClaim.signature,
      subject: subject.id,
    }

    expect(actual).toEqual(expected)
  })
})
