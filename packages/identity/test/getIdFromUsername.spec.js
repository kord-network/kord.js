const metaIdentity = require('../dist/meta-identity')

describe('@meta.js/identity :: getIdFromUsername', () => {
  it('Should generate a META Identity username hash', () => {
    const username = 'viktor-tron.id.meta'

    const actual = metaIdentity.getIdFromUsername(username)
    const expected =
      '0xcc1bfbdf07aaaec4dff026e54023295684af8e831c45cf514475dd65253eaced'

    expect(actual).toEqual(expected)
  })
})
