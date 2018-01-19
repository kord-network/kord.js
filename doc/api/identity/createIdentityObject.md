# `createIdentityObject()`

Create a valid META Identity object to register a new META Identity.

## Parameters

- `account` `<Object>` - Ethereum account object of META Identity owner
- `account.address` `<String>` - Ethereum address of META Identity owner
- `account.privateKey` `<String>` - Private key of META Identity owner
- `username` `<String>` - META Identity username

## Returns

- META Identity object `<Object>`

## Example

```js
import { createIdentityObject } from '@meta.js/identity'

createIdentityObject(
  {
    address: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3',
    privateKey: '29c9349d970ff44ebc41068cbcfc7b57792433d8f660c2eb743811e4d40eff48',
  },
  'viktor-tron.id.meta'
)
// =>
// {
//   owner: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3',
//   signature: '0x528af605360be427279da2746653f4bbf63a3bce173fe044d4b91462ffbd862e123e057e67ef06b00694e7d20c7b931637ffd9242f86a65985dd24d26eb288c801',
//   username: 'viktor-tron.id.meta',
// }
```
