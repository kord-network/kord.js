# `getUsernameFromName()`

Get a META Identity `username` from a common name.

## Parameters

- `commonName` `<String>` - Common name to use for META Identity username

## Returns

- META Identity username `<String>`

## Example

```js
import { getUsernameFromName } from '@meta.js/identity'

getUsernameFromName('Viktor Trón')
// => viktor-tron.id.meta
```
