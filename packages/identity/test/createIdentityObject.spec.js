const metaIdentity = require('../dist/meta-identity')

describe('@meta.js/identity :: createIdentityObject', () => {
  it('Should create a valid META Identity object', () => {
    const account = {
      address: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3',
      privateKey:
        '29c9349d970ff44ebc41068cbcfc7b57792433d8f660c2eb743811e4d40eff48',
    }
    const username = 'jaak'

    const actual = metaIdentity.createIdentityObject(account, username)
    const expected = {
      owner: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3',
      signature:
        '0x28b05d8af655ac086a616c4bc7c12e255d0ac66ee20efa531e6c64f2f441a2d719147f9a9f1a9f5e514e311028ad84665f2143ce43e8f0a2e3b7cc7ce8cdfcf300',
      username: 'jaak',
    }

    expect(actual).toEqual(expected)
  })
})
