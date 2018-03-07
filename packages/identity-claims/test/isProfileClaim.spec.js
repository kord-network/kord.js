const kordIdentityClaims = require('../dist/kord-identity-claims')

const verifiedClaim = require('./fixtures/verified-claim.json')
const verifiedProfileClaim = require('./fixtures/verified-profile-claim.json')

describe('@kord.js/identity-claims :: isProfileClaim', () => {
  it('Should return true for KORD Profile Claim', () => {
    const actual = kordIdentityClaims.isProfileClaim(verifiedProfileClaim)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('Should return false for non-profile KORD Claim', () => {
    const actual = kordIdentityClaims.isProfileClaim(verifiedClaim)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claim is undefined', () => {
    const actual = () => kordIdentityClaims.isProfileClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claim property is undefined', () => {
    delete verifiedClaim.property

    const actual = () => kordIdentityClaims.isProfileClaim(verifiedClaim)

    expect(actual).toThrow()
  })

  it('Should throw an error if claim is not of type object', () => {
    const claim = [verifiedProfileClaim]

    const actual = () => kordIdentityClaims.isProfileClaim(claim)

    expect(actual).toThrow()
  })
})
