const metaIdentityClaims = require('../dist/meta-identity-claims')

const followClaim = require('./fixtures/follow-claim.json')
const issuer = require('./fixtures/issuer.json')
const subject = require('./fixtures/subject.json')
const verifiedClaim = require('./fixtures/verified-claim.json')
const verifiedFollowClaim = require('./fixtures/verified-follow-claim.json')

describe('@meta.js/identity-claims :: followMetaIdentity', () => {
  it('Should return a valid verified META Identity Follow Claim object', () => {
    verifiedClaim.issuerAddress = issuer.address

    const actual = metaIdentityClaims.followMetaIdentity(
      [verifiedClaim],
      issuer,
      subject.id
    )

    const expected = {
      claim: subject.id,
      issuer: issuer.id,
      property: followClaim.property,
      signature: verifiedFollowClaim.signature,
      subject: subject.id,
    }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if META Identity claims cannot be verified', () => {
    delete verifiedClaim.issuerAddress

    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer, subject.id)

    expect(actual).toThrow()
  })

  it('Should throw an error if claims is undefined', () => {
    const actual = () => metaIdentityClaims.followMetaIdentity()

    expect(actual).toThrow()
  })

  it('Should throw an error if claims is not an array', () => {
    const actual = () => metaIdentityClaims.followMetaIdentity(verifiedClaim)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is undefined', () => {
    const actual = () => metaIdentityClaims.followMetaIdentity([verifiedClaim])

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is not of type object', () => {
    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], [issuer])

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is not of type string', () => {
    issuer.id = { id: issuer.id }

    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is undefined', () => {
    delete issuer.id

    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is not of type string', () => {
    issuer.privateKey = { privateKey: issuer.privateKey }

    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is undefined', () => {
    delete issuer.privateKey

    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is undefined', () => {
    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is not of type string', () => {
    const actual = () =>
      metaIdentityClaims.followMetaIdentity([verifiedClaim], issuer, {
        id: subject.id,
      })

    expect(actual).toThrow()
  })
})
