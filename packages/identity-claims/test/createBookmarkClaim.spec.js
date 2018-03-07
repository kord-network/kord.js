const kordIdentityClaims = require('../dist/kord-identity-claims')

const claim = require('./fixtures/claim.json')
const bookmarkClaim = require('./fixtures/bookmark-claim.json')
const issuer = require('./fixtures/issuer.json')
const subject = require('./fixtures/subject.json')
const verifiedClaim = require('./fixtures/verified-claim.json')
const verifiedBookmarkClaim = require('./fixtures/verified-bookmark-claim.json')

describe('@kord.js/identity-claims :: createBookmarkClaim', () => {
  it('Should return a valid verified KORD Bookmark Claim object', () => {
    verifiedClaim.issuerAddress = issuer.address

    const actual = kordIdentityClaims.createBookmarkClaim(
      [verifiedClaim],
      claim.graph,
      issuer,
      subject.id
    )

    const expected = {
      claim: subject.id,
      graph: claim.graph,
      issuer: issuer.id,
      property: bookmarkClaim.property,
      signature: verifiedBookmarkClaim.signature,
      subject: subject.id,
    }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if KORD Graph cannot be verified', () => {
    delete verifiedClaim.issuerAddress

    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer,
        subject.id
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if claims is undefined', () => {
    const actual = () => kordIdentityClaims.createBookmarkClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claims is not an array', () => {
    const actual = () => kordIdentityClaims.createBookmarkClaim(verifiedClaim)

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is undefined', () => {
    const actual = () => kordIdentityClaims.createBookmarkClaim([verifiedClaim])

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is not of type string', () => {
    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(verifiedClaim, [claim.graph])

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createBookmarkClaim([verifiedClaim], claim.graph)

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer is not of type object', () => {
    const actual = () =>
      kordIdentityClaims.createBookmarkClaim([verifiedClaim], claim.graph, [
        issuer,
      ])

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is not of type string', () => {
    issuer.id = { id: issuer.id }

    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer id is undefined', () => {
    delete issuer.id

    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is not of type string', () => {
    issuer.privateKey = { privateKey: issuer.privateKey }

    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if issuer privateKey is undefined', () => {
    delete issuer.privateKey

    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is not of type string', () => {
    const actual = () =>
      kordIdentityClaims.createBookmarkClaim(
        [verifiedClaim],
        claim.graph,
        issuer,
        {
          id: subject.id,
        }
      )

    expect(actual).toThrow()
  })
})
