const kordIdentityClaims = require('../dist/kord-identity-claims')

const claim = require('./fixtures/claim.json')
const issuer = require('./fixtures/issuer.json')
const subject = require('./fixtures/subject.json')
const verifiedClaim = require('./fixtures/verified-claim.json')

describe('@kord.js/identity-claims :: createVerifiedIdentityClaimObject', () => {
  it('Should return a valid verified KORD Claim object', () => {
    const actual = kordIdentityClaims.createVerifiedIdentityClaimObject(
      claim.claimMessage,
      claim.graph,
      issuer,
      claim.property,
      subject.id
    )

    const expected = {
      claim: claim.claimMessage,
      graph: claim.graph,
      issuer: issuer.id,
      property: claim.property,
      signature: verifiedClaim.signature,
      subject: subject.id,
    }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claimMessage is undefined', () => {
    const actual = () => kordIdentityClaims.createVerifiedIdentityClaimObject()

    expect(actual).toThrow()
  })

  it('Should throw an error if claimMessage is not of type string', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        { claimMessage },
        graph,
        issuer,
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is undefined', () => {
    const { claimMessage } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(claimMessage)

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is not of type string', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        { graph },
        issuer,
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is undefined', () => {
    const { claimMessage, graph } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(claimMessage, graph)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is not of type object', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        [issuer],
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is not of type string', () => {
    const { claimMessage, graph } = claim

    issuer.id = { id: issuer.id }

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is undefined', () => {
    const { claimMessage, graph } = claim

    delete issuer.id

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is not of type string', () => {
    const { claimMessage, graph } = claim

    issuer.privateKey = { privateKey: issuer.privateKey }

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is undefined', () => {
    const { claimMessage, graph } = claim

    delete issuer.privateKey

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if property is undefined', () => {
    const { claimMessage, graph } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if property is not of type string', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer,
        { property }
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is undefined', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer,
        property
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is not of type string', () => {
    const { claimMessage, graph, property } = claim

    const actual = () =>
      kordIdentityClaims.createVerifiedIdentityClaimObject(
        claimMessage,
        graph,
        issuer,
        property,
        { subject: subject.id }
      )

    expect(actual).toThrow()
  })
})
