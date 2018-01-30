# `followMetaIdentity()`

Create a valid META Identity Follow Claim object to add to META Claims index.

## Parameters

- `claims` `<Array>` - Set of META Identity Claims to verify *
- `issuer` `<Object>` - Claim issuer (follower) data object
- `issuer.id` `<String>` - META Identity ID of claim issuer
- `issuer.privateKey` `<String>` - Private key of claim issuer
- `subject` `<String>` - META Identity ID of claim subject (followed)

\* Each claim must be augmented with the Ethereum address of the claim's issuer
  as the value of an `issuerAddress` property. This can be retrieved from the
  META Network with the following GraphQL query:
  ```
  // $id = claim.issuer
  query readIdentity($id: String!) {
    identity(filter: {id: $id}) {
      id
      owner
      signature
      username
    }
  }
  ```

## Returns

- Verified META Identity Claim object `<Object>`

## Example

```js
import { followMetaIdentity } from '@meta.js/identity-claims'

followMetaIdentity(
  [
    {
      claim: 'ray.id.meta',
      issuer: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
      issuerAddress: '0x82fecC64463CBAd27af2fD9d1e15Efab0E155918'
      property: 'meta.id',
      signature: '0x2466555fa2ace795fcc7f1572963e8728baf1066948d3832231834efddae703c1b85715c34b5ac0a1517b364aeff7fc144ef9136b8df45e27fdd595682fdbe8b00',
      subject: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
    }
  ],
  {
    id: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
    privateKey: 'a2745c04382b07fa3538b25f4f8fa3a971c11acdd7c7a16f78ef90f7bccd3fb4',
  },
  '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f'
)
// =>
// {
//   claim: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
//   issuer: '0x9271978a0651b4e0eb61a1162c16edc3c20a23380c5861040a07ac0326693895',
//   property: 'follow.id',
//   signature: '0x51851d337b18c6b6c243ae38c96197ec5555226acb1534a0f49c352c9375d3ff7536c22838442d5ae1a6b76a362e797e5b0161a302dfef8f5b233a681300efd500',
//   subject: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
// }
```
