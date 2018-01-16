const metaIdentityClaims = require('../dist/meta-identity-claims')

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
