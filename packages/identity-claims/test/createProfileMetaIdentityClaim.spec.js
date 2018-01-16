const metaIdentityClaims = require('../dist/meta-identity-claims')

describe('@meta.js/identity-claims :: createProfileMetaIdentityClaim', () => {
  it('Should return a valid profile META Identity Claim object', () => {
    const issuer = {
      id: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
      privateKey:
        'a2745c04382b07fa3538b25f4f8fa3a971c11acdd7c7a16f78ef90f7bccd3fb4',
    }
    const claimMessage =
      '193fa6016d2358bd79e53637c3f72c636c95f89e154d496ac6b04b8b49966888'
    const subProperty = 'name'

    const actual = metaIdentityClaims.createProfileMetaIdentityClaim(
      claimMessage,
      issuer,
      subProperty
    )
    const expected = {
      claim: claimMessage,
      issuer: issuer.id,
      property: `profile.${subProperty}`,
      signature:
        '0x244a310ddb00eb3a29551075c6ca8c8624431b551f0f02c5cb52eea9261cd29a0f2da373715494716f666f5e5bcddbe5434bc0e5895a1ff1f21df1785bf34eee00',
      subject: issuer.id,
    }

    expect(actual).toEqual(expected)
  })
})
