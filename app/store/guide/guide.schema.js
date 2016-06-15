import { Schema, arrayOf } from 'normalizr'
import user from '../user/user.schema'
import tag from '../tag/tag.schema'

const guide = new Schema('guides')
const challenge = new Schema('challenges')

guide.define({
  user,
  challenge,
  tags: arrayOf(tag),
  guides: arrayOf(guide)
})

export default guide
