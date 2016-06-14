import { Schema } from 'normalizr'

const user = new Schema('users', {
  idAttribute: (u) => typeof u === 'string' ? u : u.id
})

export default user
