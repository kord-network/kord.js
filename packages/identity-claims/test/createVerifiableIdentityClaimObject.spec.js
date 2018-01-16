const metaIdentityClaims = require('../dist/meta-identity-claims')

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
