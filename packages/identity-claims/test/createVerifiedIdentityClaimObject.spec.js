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

  it('Should throw an error if claimMessage is undefined', () => {
    const actual = () => metaIdentityClaims.createVerifiedIdentityClaimObject()

    expect(actual).toThrow()
  })

  it('Should throw an error if claimMessage is not of type string', () => {
    const { claimMessage, property } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(
        { claimMessage },
        issuer,
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is undefined', () => {
    const { claimMessage } = claim
    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is not of type object', () => {
    const { claimMessage, property } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        [issuer],
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is not of type string', () => {
    issuer.id = { id: issuer.id }

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is undefined', () => {
    delete issuer.id

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is not of type string', () => {
    issuer.privateKey = { privateKey: issuer.privateKey }

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is undefined', () => {
    delete issuer.privateKey

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if property is undefined', () => {
    const { claimMessage } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, issuer)

    expect(actual).toThrow()
  })

  it('Should throw an error if property is not of type string', () => {
    const { claimMessage, property } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        issuer,
        { property }
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is undefined', () => {
    const { claimMessage, property } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        issuer,
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is not of type string', () => {
    const { claimMessage, property } = claim

    const actual = () =>
      metaIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        issuer,
        property,
        { subject: subject.id }
      )

    expect(actual).toThrow()
  })
})
