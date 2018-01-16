const metaIdentityClaims = require('../dist/meta-identity-claims')

/**
 * @meta.js/identity-claims tests
 */
describe('@meta.js/identity-claims :: createVerifiableIdentityClaimObject', () => {
  it('Should return a valid verifiable META Identity Claim object', () => {
    const account = {
      address: '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f',
      privateKey:
        '9969281b7a152e6e6c9bdaf60f64ad6882956c31f56241960eeae90d6980e6e7',
    }
    const claimMessage = 'id123'
    const extraData = {
      accessToken:
        'BQABMqi19NoMMXFhmpnQpm8aU_m85oKqTjgH_8BPmz2G2Vlj2TLWHQ09HAEarNml6brWGDggQj5qHSEDiNwXJPQ_NqPBtVuHL6ScipjpsxXuho6ySuWWULz2Ipaqqe74kxmiobQRS8wkHl6gPP8KIfO0TU1Q',
    }
    const subject =
      '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f'

    const actual = metaIdentityClaims.createVerifiableIdentityClaimObject(
      account,
      claimMessage,
      subject,
      extraData
    )
    const expected = {
      address: account.address,
      claimHash:
        '0xea39355900790422fb9eab06d2c6c25a2c1ce1bb6955276eeedf1055cc35623b',
      claimMessage: claimMessage,
      signature:
        '0x11694fae74072cc5df26f8e2cfeb1ba90f1a0c2c03145904973237b2ee2e32324d80808e76b446f2ee76143c33e3588d868e893ddd33c079a452bb9d81155b8f00',
      subject: subject,
      accessToken: extraData.accessToken,
    }

    expect(actual).toEqual(expected)
  })
})

describe('@meta.js/identity-claims :: createProfileMetaIdentityClaim', () => {
  it('Should return a valid profile META Identity Claim object', () => {
    const account = {
      address: '0xadE4772179087732696bE0Bc947412C6c5098Dd6',
      privateKey:
        'b3653a68c5953f236924ea6528137aee329d22dfcf5704efcff6a047352dd213',
    }
    const claimMessage = 'ray'
    const subProperty = 'name'

    const actual = metaIdentityClaims.createProfileMetaIdentityClaim(
      account,
      claimMessage,
      subProperty
    )
    const expected = {
      claim: claimMessage,
      issuer: account.address,
      property: `profile.${subProperty}`,
      signature:
        '0x35905458252598752ed9cc93d799d0f47b70f660da2ba95dfdc9dc4bbcdbfa370c236f73c8b1427af801bfbe3ffbf578119e6804238e5c2cc61c9afffc38052801',
      subject: account.address,
    }

    expect(actual).toEqual(expected)
  })
})

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

describe('@meta.js/identity-claims :: signMessage', () => {
  it('Should return signature of message', () => {
    const message = 'id123'
    const privateKey =
      '9969281b7a152e6e6c9bdaf60f64ad6882956c31f56241960eeae90d6980e6e7'

    const actual = metaIdentityClaims.signMessage(message, privateKey)
    const expected =
      '0x11694fae74072cc5df26f8e2cfeb1ba90f1a0c2c03145904973237b2ee2e32324d80808e76b446f2ee76143c33e3588d868e893ddd33c079a452bb9d81155b8f00'

    expect(actual).toEqual(expected)
  })
})

describe('@meta.js/identity-claims :: recoverAddressFromIdentityClaim', () => {
  it('Should recover address from META Identity Claim', () => {
    const claimHash =
      '0xea39355900790422fb9eab06d2c6c25a2c1ce1bb6955276eeedf1055cc35623b'
    const signature =
      '0x11694fae74072cc5df26f8e2cfeb1ba90f1a0c2c03145904973237b2ee2e32324d80808e76b446f2ee76143c33e3588d868e893ddd33c079a452bb9d81155b8f00'

    const actual = metaIdentityClaims.recoverAddressFromIdentityClaim(
      claimHash,
      signature
    )
    const expected = '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f'

    expect(actual).toEqual(expected)
  })
})

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
