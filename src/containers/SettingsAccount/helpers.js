
export const mapUserSettings = (settingsConfig, settings) => {
  const config = { ...settingsConfig }

  config.privacy = mapConfigObj(config.privacy.sections)
  config.communications = mapConfigObj(config.communications.sections)

  function mapConfigObj(data) {
    const setingsValues = Object.keys(data).reduce((prev, curr) => {
      prev = {
        ...prev,
        [curr]: {
          title: data[curr].title,
          ...data[curr].settings
        }
      }
      return prev
    }, {})

    Object.keys(setingsValues).forEach(section => {
      Object.keys(setingsValues[section]).forEach(item => {
        if (typeof setingsValues[section][item] === 'object') {
          setingsValues[section][item].type = Number(settings[item])
        }
      })
    })

    return setingsValues
  }

  return config
}

export const mapUserSettingsBeforeSave = (data) => {
  const setingsValues = Object.keys(data).reduce((prev, curr) => {
    prev = { ...prev, ...data[curr] }
    return prev
  }, {})

  const mappedData = Object.keys(setingsValues).map(key => key).reduce((prev, curr) => {
    prev[curr] = setingsValues[curr].type
    return prev
  }, {})

  delete mappedData.title
  return mappedData
}
