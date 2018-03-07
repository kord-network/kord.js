# `createBookmarkClaim()`

Create a valid KORD Bookmark Claim object to add to a KORD Graph.

## Parameters

- `issuer` `<Object>` - Claim issuer (bookmarker) data object
- `issuer.id` `<String>` - KORD ID of claim issuer
- `issuer.privateKey` `<String>` - Private key of claim issuer
- `subject` `<String>` - KORD ID of claim subject (bookmarked)

## Returns

- Verified KORD Claim object `<Object>`

## Example

```js
import { createBookmarkClaim } from '@kord.js/identity-claims'

createBookmarkClaim(
  {
    id: '0x82fecC64463CBAd27af2fD9d1e15Efab0E155918',
    privateKey: 'a2745c04382b07fa3538b25f4f8fa3a971c11acdd7c7a16f78ef90f7bccd3fb4',
  },
  '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b133'
)
// =>
// {
//   claim: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b13342f12834a4184c8a31d7b84f',
//   issuer: '0x82fecC64463CBAd27af2fD9d1e15Efab0E155918',
//   property: 'bookmark.graph',
//   signature: '0x51851d337b18c6b6c243ae38c96197ec5555226acb1534a0f49c352c9375d3ff7536c22838442d5ae1a6b76a362e797e5b0161a302dfef8f5b233a681300efd500',
//   subject: '0xe864f1c2c17d143cfbc1ae68f2977e0068a2b133',
// }
```
