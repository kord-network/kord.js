const kordIdentityClaims = require('../dist/kord-identity-claims')

const account = require('./fixtures/account.json')
const claim = require('./fixtures/claim.json')
const subject = require('./fixtures/subject.json')

describe('@kord.js/identity-claims :: createVerifiableIdentityClaimObject', () => {
  it('Should return a valid verifiable KORD Claim object', () => {
    const actual = kordIdentityClaims.createVerifiableIdentityClaimObject(
      account,
      claim.claimMessage,
      claim.graph,
      subject.id,
      claim.extraData
    )

    const expected = {
      address: account.address,
      claimHash: claim.claimHash,
      claimMessage: claim.claimMessage,
      graph: claim.graph,
      signature: claim.signature,
      subject: subject.id,
      accessToken: claim.extraData.accessToken,
    }

    expect(actual).toEqual(expected)
  })

  it('Should throw an error if claimMessage is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if claimMessage is not of type string', () => {
    const claimMessage = { claimMessage: claim.claimMessage }

    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claimMessage
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claim.claimMessage
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if graph is not of type string', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claim.claimMessage,
        { graph: claim.graph }
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claim.claimMessage,
        claim.graph
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if subject is not of type string', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claim.claimMessage,
        claim.graph,
        { subject: subject.id }
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if extraData is not of type object', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(
        account,
        claim.claimMessage,
        claim.graph,
        subject.id,
        claim.extraData.accessToken
      )

    expect(actual).toThrow()
  })

  it('Should throw an error if account is undefined', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject()

    expect(actual).toThrow()
  })

  it('Should throw an error if account is not of type object', () => {
    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject([account])

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is not of type string', () => {
    account.address = { address: account.address }

    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account address is undefined', () => {
    delete account.address

    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is not of type string', () => {
    account.privateKey = { privateKey: account.privateKey }

    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(account)

    expect(actual).toThrow()
  })

  it('Should throw an error if account privateKey is undefined', () => {
    delete account.privateKey

    const actual = () =>
      kordIdentityClaims.createVerifiableIdentityClaimObject(account)

    expect(actual).toThrow()
  })
})
