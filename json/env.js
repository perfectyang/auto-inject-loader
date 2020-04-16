export const getEnv = (identifiedStr = location.hostname) => {
  let env = /dev|test/.exec(identifiedStr)
  let local = /192|127|localhost/.exec(identifiedStr)
  if (local) {
    let PROXY_TARGET = process.env.PROXY_TARGET
    if (PROXY_TARGET) {
      let localEnv = /dev|test/.exec(PROXY_TARGET)
      return localEnv ? localEnv[0] : ''
    } else {
      return 'dev'
    }
  } else {
    return env ? env[0] : ''
  }
}

export const getEnvHostname = (identifiedStr = location.hostname) => {
  let env = getEnv(identifiedStr)
  return `//${env ? env + '-' : ''}vtalk.qdtech.ai`
}

export const getEnvStaticName = (identifiedStr = location.hostname) => {
  let env = getEnv(identifiedStr)
  return `//${env ? env + '_' : ''}static.qdtech.ai`
}

export const getEnvStaticPath = (identifiedStr = location.hostname) => {
  return `${getEnvStaticName()}/static/vtalk`
}

export const isLocal = () => {
  return process.env.NODE_ENV === 'development'
}

export const getProjectPath = () => {
  return location.origin + (isLocal() ? '' : `/${process.env.PROJECT_NAME}`)
}
