const metaIdentityClaims = require('../dist/meta-identity-claims')

const claim = require('./fixtures/claim.json')
const issuer = require('./fixtures/issuer.json')
const profileClaim = require('./fixtures/profile-claim.json')
const verifiedProfileClaim = require('./fixtures/verified-profile-claim.json')

describe('@meta.js/identity-claims :: createProfileMetaIdentityClaim', () => {
  it('Should return a valid profile META Identity Claim object', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = metaIdentityClaims.createProfileMetaIdentityClaim(
      claimMessage,
      claim.graph,
      issuer,
      subProperty
    )

    const expected = {
      claim: claimMessage,
      graph: claim.graph,
      issuer: issuer.id,
      property: verifiedProfileClaim.property,
      signature: verifiedProfileClaim.signature,
      subject: issuer.id,
    }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claimMessage is undefined', () => {
    const actual = () => metaIdentityClaims.createProfileMetaIdentityClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claimMessage is not of type string', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        { claimMessage },
        issuer,
        subProperty
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is undefined', () => {
    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(claimMessage)

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is not of type string', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        { graph: claim.graph },
        issuer,
        subProperty
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is undefined', () => {
    const { claimMessage } = profileClaim
    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is not of type object', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        'issuer',
        subProperty
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is not of type string', () => {
    issuer.id = { id: issuer.id }

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is undefined', () => {
    delete issuer.id

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is not of type string', () => {
    issuer.privateKey = { privateKey: issuer.privateKey }

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is undefined', () => {
    delete issuer.privateKey

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subProperty is not of type string', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer,
        {
          subProperty,
        }
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subProperty is undefined', () => {
    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subProperty is not of type string', () => {
    const { claimMessage, subProperty } = profileClaim

    const actual = () =>
      metaIdentityClaims.createProfileMetaIdentityClaim(
        claimMessage,
        claim.graph,
        issuer,
        {
          subProperty,
        }
      )

    expect(actual).toThrow()
  })
})
