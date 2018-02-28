# `createGraphObject()`

Create a valid META Graph object to register a new META Graph.

## Parameters

- `address` `<String>` - Ethereum address of META Graph owner

## Returns

- META Graph object `<Object>`

## Example

```js
import { createGraphObject } from '@meta.js/identity'

createGraphObject('0xc4300acba32f5631ec4e45b3d62bd31f947a27e3')
// =>
// {
//   id: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3'
// }
```
