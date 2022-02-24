import mongodb from 'mongodb'
const ObjectID = mongodb.ObjectId
let contacts

export default class ContactsModel {

    static async injectDB(conn) {
        if (contacts) {
            return
        }
        try {
            contacts = await conn.db(process.env.CONTACTS_NS).collection('con_list')
        } catch (e) {
            console.error(
                `Contact Model Error: ${e}`
            );
        }
    }

    static async getContacts({
        filters = null,
        page = 0,
        contactsPerPage = 20
    } = {}) {
        let query

        if (filters) {
            if ('name' in filters) {
                query = {
                    $text: {
                        $search: filters['name']
                    }
                }
            } else if ('email' in filters) {
                query = {
                    email: {
                        $eq: filters['email']
                    }
                }
            }
        }

        let cursor

        try {
            cursor = await contacts.find(query)
        } catch (e) {
            console.error(`Unable to run find cmd, ${e}`)
            return {
                contactsList: [],
                totalNumContacts: 0,
                pageNum: page
            }
        }

        const displayCursor = cursor.limit(contactsPerPage).skip(contactsPerPage * page)

        try {
            const contactsList = await displayCursor.toArray()
            const totalNumContacts = await contacts.countDocuments(query)

            return {
                contactsList,
                totalNumContacts,
                pageNum: page
            }
        } catch (e) {
            console.error(`cursor to array problem, or doc Count prob, ${e}`)
            return {
                contactsList: [],
                totalNumContacts: 0,
                pageNum: page
            }
        }
    }

    static async getContactByID(id) {
        try {
            const pipeline = [{
                $match: {
                    _id: new ObjectID(id),
                },
            }, ]

            return await contacts.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Error in get with id : ${e}`)
            throw e
        }
    }

    static async addContact(name, email, phone) {
        try {
            const contactDoc = {
                name: name,
                email: email,
                phone: phone
            }
            return await contacts.insertOne(contactDoc)
        } catch (e) {
            console.error(`Unable to Post Contact, ${e}`)
            return {
                error: e
            }
        }
    }
}