# `createGraphObject()`

Create a valid META Graph object to register a new META Graph.

## Parameters

- `account` `<Object>` - Ethereum account object of META Graph owner
- `account.address` `<String>` - Ethereum address of META Graph owner
- `account.privateKey` `<String>` - Private key of META Graph owner

## Returns

- META Graph object `<Object>`

## Example

```js
import { createGraphObject } from '@meta.js/identity'

createGraphObject(
  {
    address: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3',
    privateKey: '29c9349d970ff44ebc41068cbcfc7b57792433d8f660c2eb743811e4d40eff48',
  }
)
// =>
// {
//   id: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3'
// }
```
