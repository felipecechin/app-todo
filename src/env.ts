export default {
    mongoUrl: process.env.MONGO_URL as string || 'connect',
    mongoDb: process.env.MONGO_DB as string || 'db',
    jwtSecret: process.env.JWT_SECRET_KEY as string || 'secret'
}
