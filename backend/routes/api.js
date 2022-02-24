import express from 'express'
import ContactRoutes from './api/contacts.routes.js'

const router = express()

router.use('/contacts', ContactRoutes)

export default router