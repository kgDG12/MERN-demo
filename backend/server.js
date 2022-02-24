import express from 'express'
import cors from 'cors'
import ApiRoutes from './routes/api.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', ApiRoutes)
app.use('*', (req, res) => res.status(404).json({
    error: "not found"
}))

export default app