import express from 'express'
import bodyParser from 'body-parser'
import contactsController from '../../controllers/contactsController.js'

const route = express.Router()
route.use(bodyParser.json({
    extended: true
}));
route.use(bodyParser.urlencoded({
    extended: true
}));

route.get('/', contactsController.getContacts)
route.get('/id/:id', contactsController.getContactByID)

route.post('/add', contactsController.addContact)
route.put('/upd', contactsController.updContact)
route.delete('/del', contactsController.delContact)

export default route