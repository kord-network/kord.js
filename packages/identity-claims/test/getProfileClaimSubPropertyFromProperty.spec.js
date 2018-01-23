const metaIdentityClaims = require('../dist/meta-identity-claims')
const metaShared = require('../../shared/dist/meta-shared')

const profileClaim = require('./fixtures/profile-claim.json')

describe('@meta.js/identity-claims :: getProfileClaimSubPropertyFromProperty', () => {
  it('Should return the sub-property of META Identity Profile Claim property', () => {
    const { subProperty } = profileClaim
    const property = `${metaShared.META_ID_PROFILE_CLAIM_PREFIX}${subProperty}`

    const actual = metaIdentityClaims.getProfileClaimSubPropertyFromProperty(
      property
    )
    const expected = subProperty

    expect(actual).toEqual(expected)
  })

  it('Should return property unaltered if profile claim prefix is not found', () => {
    const property = 'name'

    const actual = metaIdentityClaims.getProfileClaimSubPropertyFromProperty(
      property
    )
    const expected = property

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if property is undefined', () => {
    const actual = () =>
      metaIdentityClaims.getProfileClaimSubPropertyFromProperty()

    expect(actual).toThrow()
  })

  it('Should throw an error if property is not of type string', () => {
    const { subProperty } = profileClaim
    const property = {
      property: `${metaShared.META_ID_PROFILE_CLAIM_PREFIX}${subProperty}`,
    }

    const actual = () =>
      metaIdentityClaims.getProfileClaimSubPropertyFromProperty(property)

    expect(actual).toThrow()
  })
})
