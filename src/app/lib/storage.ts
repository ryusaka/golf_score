let store = {}
if (typeof localStorage !== 'undefined') {
  store = JSON.parse(localStorage.getItem('golfix') || '{}')
}

export const get = (key: string) => {
  return store[key]
}

export const set = (key: string, value: any) => {
  store[key] = value
  try {
    localStorage.setItem('golfix', JSON.stringify(store))
  } catch (e) {
    // empty
  }
}

export const remove = (key: string) => {
  delete store[key]
  try {
    localStorage.setItem('golfix', JSON.stringify(store))
  } catch (e) {
    // empty
  }
}
