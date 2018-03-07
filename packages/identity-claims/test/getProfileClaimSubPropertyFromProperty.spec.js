const kordIdentityClaims = require('../dist/kord-identity-claims')
const kordShared = require('../../shared/dist/kord-shared')

const profileClaim = require('./fixtures/profile-claim.json')

describe('@kord.js/identity-claims :: getProfileClaimSubPropertyFromProperty', () => {
  it('Should return the sub-property of KORD Profile Claim property', () => {
    const { subProperty } = profileClaim
    const property = `${kordShared.KORD_PROFILE_CLAIM_PREFIX}${subProperty}`

    const actual = kordIdentityClaims.getProfileClaimSubPropertyFromProperty(
      property
    )
    const expected = subProperty

    expect(actual).toEqual(expected)
  })

  it('Should return property unaltered if profile claim prefix is not found', () => {
    const property = 'name'

    const actual = kordIdentityClaims.getProfileClaimSubPropertyFromProperty(
      property
    )
    const expected = property

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if property is undefined', () => {
    const actual = () =>
      kordIdentityClaims.getProfileClaimSubPropertyFromProperty()

    expect(actual).toThrow()
  })

  it('Should throw an error if property is not of type string', () => {
    const { subProperty } = profileClaim
    const property = {
      property: `${kordShared.KORD_PROFILE_CLAIM_PREFIX}${subProperty}`,
    }

    const actual = () =>
      kordIdentityClaims.getProfileClaimSubPropertyFromProperty(property)

    expect(actual).toThrow()
  })
})
