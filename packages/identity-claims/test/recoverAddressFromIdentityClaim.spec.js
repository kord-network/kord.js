const metaIdentityClaims = require('../dist/meta-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')

describe('@meta.js/identity-claims :: recoverAddressFromIdentityClaim', () => {
  it('Should recover address from META Identity Claim', () => {
    const actual = metaIdentityClaims.recoverAddressFromIdentityClaim(
      claim.claimHash,
      claim.signature
    )

    const expected = account.address

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claimHash is undefined', () => {
    const actual = () => metaIdentityClaims.recoverAddressFromIdentityClaim()

    expect(actual).toThrow()
  })

  it('Should throw an error if claimHash is not of type string', () => {
    const claimHash = { claimHash: claim.claimHash }

    const actual = () =>
      metaIdentityClaims.recoverAddressFromIdentityClaim(claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is undefined', () => {
    const actual = () =>
      metaIdentityClaims.recoverAddressFromIdentityClaim(claim.claimHash)

    expect(actual).toThrow()
  })

  it('Should throw an error if signature is not a valid Ethereum RPC signature', () => {
    const signature = claim.signature.slice(2)

    const actual = () =>
      metaIdentityClaims.recoverAddressFromIdentityClaim(
        claim.claimHash,
        signature
      )

    expect(actual).toThrow()
  })
})
