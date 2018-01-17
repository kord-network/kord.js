const metaIdentityClaims = require('../dist/meta-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')
const subject = require('./fixtures/subject.json')

describe('@meta.js/identity-claims :: createVerifiableIdentityClaimObject', () => {
  it('Should return a valid verifiable META Identity Claim object', () => {
    const actual = metaIdentityClaims.createVerifiableIdentityClaimObject(
      account,
      claim.claimMessage,
      subject.id,
      claim.extraData
    )

    const expected = {
      address: account.address,
      claimHash: claim.claimHash,
      claimMessage: claim.claimMessage,
      signature: claim.signature,
      subject: subject.id,
      accessToken: claim.extraData.accessToken,
    }

    expect(actual).toEqual(expected)
  })
})
