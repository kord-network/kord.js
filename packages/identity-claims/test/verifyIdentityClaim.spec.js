const metaIdentityClaims = require('../dist/meta-identity-claims')

describe('@meta.js/identity-claims :: verifyIdentityClaim', () => {
  it('Should verify address recovered from META Identity Claim', () => {
    const address = '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f'
    const claimHash =
      '0xea39355900790422fb9eab06d2c6c25a2c1ce1bb6955276eeedf1055cc35623b'
    const signature =
      '0x11694fae74072cc5df26f8e2cfeb1ba90f1a0c2c03145904973237b2ee2e32324d80808e76b446f2ee76143c33e3588d868e893ddd33c079a452bb9d81155b8f00'

    const actual = metaIdentityClaims.verifyIdentityClaim(
      address,
      claimHash,
      signature
    )
    const expected = true

    expect(actual).toEqual(expected)
  })
})
