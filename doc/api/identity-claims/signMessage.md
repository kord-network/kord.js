# `signMessage()`

Generate a valid ECDSA signature for use with Ethereum RPC clients.

## Parameters

- `message` `<String>` - Message to sign
- `privateKey` `<String>` - Private key to sign message with

## Returns

- ECDSA signature `<String>`

## Example

```js
import { signMessage } from '@meta.js/identity-claims'

signMessage(
  'ray.id.meta',
  '9969281b7a152e6e6c9bdaf60f64ad6882956c31f56241960eeae90d6980e6e7'
)
// => 0x34e54b455a6700fcc784302815846dc10b84834bc03f07a3d58a7af91c8ca34910d0716b735c580675edfacb164a6e2f9b14a768cb6825b73c24eee2ed59d0e601
```
