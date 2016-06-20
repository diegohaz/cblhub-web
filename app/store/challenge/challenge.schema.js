import { Schema, arrayOf } from 'normalizr'
import user from '../user/user.schema'
import tag from '../tag/tag.schema'
import guide from '../guide/guide.schema'
import photo from '../photo/photo.schema'

const challenge = new Schema('challenges')

challenge.define({
  user,
  photo,
  users: arrayOf(user),
  tags: arrayOf(tag),
  guides: arrayOf(guide)
})

export default challenge
