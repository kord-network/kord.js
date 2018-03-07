# `createVerifiableIdentityClaimObject()`

Create a valid KORD Claim object to verify a new identity claim.

## Parameters

- `account` `<Object>` - Ethereum account object
- `account.address` `<String>` - Account Ethereum address
- `account.privateKey` `<String>` - Account private key
- `claimMessage` `<Object>` - Raw identity claim message
- `subject` `<String>` - KORD ID of subject (hash of `username`)
- `extraData` `<Object>` - Any extra properties to add to identity claim object

## Returns

- KORD Claim object `<Object>`

## Example

```js
import { createVerifiableIdentityClaimObject } from '@kord.js/identity-claims'

createVerifiableIdentityClaimObject(
  {
    address: '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f',
    privateKey: '9969281b7a152e6e6c9bdaf60f64ad6882956c31f56241960eeae90d6980e6e7'
  },
  'someMessage',
  '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f'
)
// =>
// {
//   address: '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f',
//   claimHash: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
//   claimMessage: 'someMessage',
//   signature: '0x34e54b455a6700fcc784302815846dc10b84834bc03f07a3d58a7af91c8ca34910d0716b735c580675edfacb164a6e2f9b14a768cb6825b73c24eee2ed59d0e601',
//   subject: '0xE4258268bf30F9540EeBfF7150148E387bcE0a2f',
// }
```
