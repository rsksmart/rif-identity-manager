const LOCAL_STORAGE_KEY = 'id-manager-settings'

export const saveToLocalStorage = (chainId: string, key: string, value: string) => {
  const settings = localStorage.getItem(`${LOCAL_STORAGE_KEY}-${chainId}`)

  const json = settings ? JSON.parse(settings) : {}
  if (!json[key]) {
    json[key] = []
  }
  json[key].push(value)

  localStorage.setItem(`${LOCAL_STORAGE_KEY}-${chainId}`, JSON.stringify(json))
}

export const getValueFromLocalStorage = (chainId: string, key: string) => {
  const settings = localStorage.getItem(`${LOCAL_STORAGE_KEY}-${chainId}`)
  if (!settings) { return null }

  const json = JSON.parse(settings)
  return json[key]
}
