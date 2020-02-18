import errorTranslates from 'constants/error-translates'

export default function(err) {
  let error = errorTranslates[err.error] || err.error
  if (typeof err.error.map === 'function') {
    error = err.error.map(e => errorTranslates[e] || e)
  }
  return Promise.reject({
    commonErrors: error,
  })
}
