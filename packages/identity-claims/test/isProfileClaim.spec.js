const metaIdentityClaims = require('../dist/meta-identity-claims')

const verifiedClaim = require('./fixtures/verified-claim.json')
const verifiedProfileClaim = require('./fixtures/verified-profile-claim.json')

describe('@meta.js/identity-claims :: isProfileClaim', () => {
  it('Should return true for META Identity Profile Claim', () => {
    const actual = metaIdentityClaims.isProfileClaim(verifiedProfileClaim)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('Should return false for non-profile META Identity Claim', () => {
    const actual = metaIdentityClaims.isProfileClaim(verifiedClaim)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claim is undefined', () => {
    const actual = () => metaIdentityClaims.isProfileClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claim property is undefined', () => {
    delete verifiedClaim.property

    const actual = () => metaIdentityClaims.isProfileClaim(verifiedClaim)

    expect(actual).toThrow()
  })

  it('Should throw an error if claim is not of type object', () => {
    const claim = [verifiedProfileClaim]

    const actual = () => metaIdentityClaims.isProfileClaim(claim)

    expect(actual).toThrow()
  })
})
