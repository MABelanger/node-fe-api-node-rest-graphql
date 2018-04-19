import mongoose from 'mongoose'
import appConfig from './config'
mongoose.Promise = global.Promise

export const connect = (config = appConfig) => {
  return mongoose.connect(appConfig.db.url, {
    useMongoClient: true
  })
}

export default {
  connect
}
