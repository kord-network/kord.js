const kordIdentityClaims = require('../dist/kord-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@kord.js/identity-claims :: verifyIdentityClaim', () => {
  it('Should verify address recovered from KORD Claim', () => {
    const actual = kordIdentityClaims.verifyIdentityClaim(
      account.address,
      claim.claimHash,
      claim.signature
    )

    const expected = true

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if address is undefined', () => {
    const actual = () => kordIdentityClaims.verifyIdentityClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if address is not of type string', () => {
    const address = { address: account.address }

    const actual = () => kordIdentityClaims.verifyIdentityClaim(address)

    expect(actual).toThrow()
  })

  it('Should throw an error if claimHash is undefined', () => {
    const actual = () => kordIdentityClaims.verifyIdentityClaim(account.address)

    expect(actual).toThrow()
  })

  it('Should throw an error if claimHash is not of type string', () => {
    const claimHash = { claimHash: claim.claimHash }

    const actual = () =>
      kordIdentityClaims.verifyIdentityClaim(account.address, claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is undefined', () => {
    const actual = () =>
      kordIdentityClaims.verifyIdentityClaim(account.address, claim.claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is not of type string', () => {
    const signature = { signature: claim.signature }

    const actual = () =>
      kordIdentityClaims.verifyIdentityClaim(
        account.address,
        claim.claimHash,
        signature
      )

    expect(actual).toThrow()
  })
})
