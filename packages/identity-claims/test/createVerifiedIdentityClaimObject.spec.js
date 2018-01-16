const metaIdentityClaims = require('../dist/meta-identity-claims')

describe('@meta.js/identity-claims :: createVerifiedIdentityClaimObject', () => {
  it('Should return a valid verified META Identity Claim object', () => {
    const claimMessage = 'ray.id.meta'

    const issuer = {
      id: '0x2013ce5cacbfb860251db4c55f0ed4d70e89c6c6700a5fd7a38fe45afa12ec92',
      privateKey:
        '9969281b7a152e6e6c9bdaf60f64ad6882956c31f56241960eeae90d6980e6e7',
    }

    const property = 'metaid'

    const subject =
      '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f'

    const actual = metaIdentityClaims.createVerifiedIdentityClaimObject(
      claimMessage,
      issuer,
      property,
      subject
    )
    const expected = {
      claim: claimMessage,
      issuer: issuer.id,
      property: property,
      signature:
        '0xf87b4075132ce1cbc61ea2059c1b134e70269c2b7445f2fd8b1a56ebe8c7fccd7ca219d8ca4eb0193ef36046175cf84318e413415e1c9f16f55aab28df40048301',
      subject: subject,
    }

    expect(actual).toEqual(expected)
  })
})
