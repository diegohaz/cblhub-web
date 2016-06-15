import { Schema, arrayOf } from 'normalizr'
import user from '../user/user.schema'
import tag from '../tag/tag.schema'

const challenge = new Schema('challenges')

challenge.define({
  user,
  users: arrayOf(user),
  tags: arrayOf(tag)
})

export default challenge
