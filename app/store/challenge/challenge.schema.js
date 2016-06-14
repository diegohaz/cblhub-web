import { Schema, arrayOf } from 'normalizr'
import user from '../user/user.schema'

const challenge = new Schema('challenges', {
  idAttribute: (c) => typeof c === 'string' ? c : c.id
})

challenge.define({
  user,
  users: arrayOf(user)
})

export default challenge
