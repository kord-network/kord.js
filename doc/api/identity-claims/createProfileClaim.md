# `createProfileClaim()`

Create a valid KORD Claim object for a profile claim.
This is a self-issued claim, usually referencing a Swarm hash of profile data.

## Parameters

- `claimMessage` `<String>` - Raw identity claim message
- `issuer` `<Object>` - Claim issuer data object
- `issuer.id` `<String>` - KORD ID of claim issuer
- `issuer.privateKey` `<String>` - Private key of claim issuer
- `subProperty` `<String>` - Type of profile claim contained in `claimMessage`

## Returns

- Verified KORD Claim object `<Object>`

## Example

```js
import { createProfileClaim } from '@kord.js/identity-claims'

createProfileClaim(
  '193fa6016d2358bd79e53637c3f72c636c95f89e154d496ac6b04b8b49966888',
  {
    id: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
    privateKey: 'a2745c04382b07fa3538b25f4f8fa3a971c11acdd7c7a16f78ef90f7bccd3fb4',
  },
  'name'
)
// =>
// {
//   claim: '193fa6016d2358bd79e53637c3f72c636c95f89e154d496ac6b04b8b49966888',
//   issuer: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
//   property: 'profile.name',
//   signature: '0x244a310ddb00eb3a29551075c6ca8c8624431b551f0f02c5cb52eea9261cd29a0f2da373715494716f666f5e5bcddbe5434bc0e5895a1ff1f21df1785bf34eee00',
//   subject: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
// }
```
