import expect from 'expect'
import * as v from './'

describe('Validation Service', function () {
  it('should validate email', function () {
    expect(v.email('invalid')).toBeTruthy()
    expect(v.email('invalid@invalid')).toBeTruthy()
    expect(v.email('valid@valid.com')).toBeFalsy()
  })

  it('should validate url', function () {
    expect(v.url('invalid')).toBeTruthy()
    expect(v.url('valid.com')).toBeFalsy()
    expect(v.url('valid.com/test')).toBeFalsy()
    expect(v.url('http://valid.com')).toBeFalsy()
  })

  it('should validate required', function () {
    expect(v.required('')).toBeTruthy()
    expect(v.required(null)).toBeTruthy()
    expect(v.required(undefined)).toBeTruthy()
    expect(v.required('valid')).toBeFalsy()
  })

  it('should validate minLength', function () {
    expect(v.minLength(5)('1234')).toBeTruthy()
    expect(v.minLength(5)('12345')).toBeFalsy()
  })

  it('should validate maxLength', function () {
    expect(v.maxLength(5)('123456')).toBeTruthy()
    expect(v.maxLength(5)('12345')).toBeFalsy()
  })

  it('should validate integer', function () {
    expect(v.integer('invalid')).toBeTruthy()
    expect(v.integer('2.3')).toBeTruthy()
    expect(v.integer('.5')).toBeTruthy()
    expect(v.integer('1')).toBeFalsy()
  })

  it('should validate oneOf', function () {
    expect(v.oneOf(['valid', 'test'])('invalid')).toBeTruthy()
    expect(v.oneOf(['valid', 'test'])('valid')).toBeFalsy()
    expect(v.oneOf(['valid', 'test'])('test')).toBeFalsy()
  })

  it('should validate match', function () {
    expect(v.match('invalid')('123', { password: '321' })).toBeTruthy()
    expect(v.match('password')('123', { password: '321' })).toBeTruthy()
    expect(v.match('password')('321', { password: '321' })).toBeFalsy()
  })

  it('should createValidator', function () {
    const validator = v.createValidator({
      email: [v.required, v.email],
      password: [v.required, v.minLength(6)],
      passwordRepeat: [v.match('password'), v.required]
    })

    expect(validator).toBeA('function')

    expect(validator({
      email: '',
      password: '',
      passwordRepeat: null
    })).toEqual({
      email: v.required(''),
      password: v.required(''),
      passwordRepeat: v.match('a')('c', { a: 'b' })
    }, 'Expected to follow the validation order')

    expect(validator({
      email: 'invalid',
      password: '12345',
      passwordRepeat: ''
    })).toIncludeKeys(['email', 'password', 'passwordRepeat'])

    expect(validator({
      email: 'test@example.com',
      password: '12345',
      passwordRepeat: ''
    })).toIncludeKeys(['password', 'passwordRepeat'])

    expect(validator({
      email: 'test@example.com',
      password: '123456',
      passwordRepeat: '654321'
    })).toIncludeKeys(['passwordRepeat'])

    expect(validator({
      email: 'test@example.com',
      password: '123456',
      passwordRepeat: '123456'
    })).toEqual({})
  })
})
