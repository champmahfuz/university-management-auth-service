import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected successfully`)

    app.listen(config.port, () => {
      console.log(`Application app listening on port on ${config.port}`)
    })
  } catch (err) {
    console.log(`Failed to connect database`, err)
  }
}
bootstrap()

//This is comment
