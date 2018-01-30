# `createVerifiedIdentityClaimObject()`

Create a valid META Identity Claim object to add to META Claims index.

## Parameters

- `claimMessage` `<String>` - Raw claim value
- `issuer` `<Object>` - Claim issuer data object
- `issuer.id` `<String>` - META Identity ID of claim issuer
- `issuer.privateKey` `<String>` - Private key of claim issuer
- `property` `<String>` - Property of identity claim
- `subject` `<String>` - META Identity ID of claim subject

## Returns

- Verified META Identity Claim object `<Object>`

## Example

```js
import { createVerifiedIdentityClaimObject } from '@meta.js/identity-claims'

createVerifiedIdentityClaimObject(
  'ray.id.meta',
  {
    id: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
    privateKey: 'a2745c04382b07fa3538b25f4f8fa3a971c11acdd7c7a16f78ef90f7bccd3fb4',
  },
  'meta.id',
  '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f'
)
// =>
// {
//   claim: 'ray.id.meta',
//   issuer: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
//   property: 'meta.id',
//   signature: '0x2466555fa2ace795fcc7f1572963e8728baf1066948d3832231834efddae703c1b85715c34b5ac0a1517b364aeff7fc144ef9136b8df45e27fdd595682fdbe8b00',
//   subject: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
// }
```
