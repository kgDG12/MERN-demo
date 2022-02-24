import app from './server.js'
import mongodb from 'mongodb'
import 'dotenv/config'
import ContactsModel from './models/contacts.model.js'

const MongoClient = mongodb.MongoClient

const URL = process.env.HOST_URL
const PORT = process.env.PORT || 8000

MongoClient.connect(process.env.CONTACTS_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500
}).catch(err => {
    console.error(err.stack)
    process.exit()
}).then(async client => {
    await ContactsModel.injectDB(client)    
    app.listen(PORT, () => {
        console.log(`Api Listening at ${URL}:${PORT}`);
    })
})