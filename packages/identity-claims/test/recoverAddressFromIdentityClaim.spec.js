const kordIdentityClaims = require('../dist/kord-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@kord.js/identity-claims :: recoverAddressFromIdentityClaim', () => {
  it('Should recover address from KORD Claim', () => {
    const actual = kordIdentityClaims.recoverAddressFromIdentityClaim(
      claim.claimHash,
      claim.signature
    )

    const expected = account.address

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claimHash is undefined', () => {
    const actual = () => kordIdentityClaims.recoverAddressFromIdentityClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claimHash is not of type string', () => {
    const claimHash = { claimHash: claim.claimHash }

    const actual = () =>
      kordIdentityClaims.recoverAddressFromIdentityClaim(claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is undefined', () => {
    const actual = () =>
      kordIdentityClaims.recoverAddressFromIdentityClaim(claim.claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is not a valid Ethereum RPC signature', () => {
    const signature = claim.signature.slice(2)

    const actual = () =>
      kordIdentityClaims.recoverAddressFromIdentityClaim(
        claim.claimHash,
        signature
      )

    expect(actual).toThrow()
  })
})
