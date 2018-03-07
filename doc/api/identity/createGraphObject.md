# `createGraphObject()`

Create a valid KORD Graph object to register a new KORD Graph.

## Parameters

- `address` `<String>` - Ethereum address of KORD Graph owner

## Returns

- KORD Graph object `<Object>`

## Example

```js
import { createGraphObject } from '@kord.js/identity'

createGraphObject('0xc4300acba32f5631ec4e45b3d62bd31f947a27e3')
// =>
// {
//   id: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3'
// }
```
