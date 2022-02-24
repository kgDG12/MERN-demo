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
        except = null,
        page = 0,
        contactsPerPage = 20
    } = {}) {
        let query = {}

        if (filters) {
            if ('name' in filters) {
                query.$text = {
                    $search: filters['name']
                }
            }
            if ('email' in filters) {
                query.email = {
                    $eq: filters['email']
                }

            }
            if ('phone' in filters) {
                query.phone = {
                    $eq: filters['phone']
                }

            }
            if ('search' in filters) {
                query.$search = {
                    index: 'default',
                    text: {
                        query: filters['search'],
                        path: {
                            'wildcard': '*'
                        }
                    }
                }

            }

        }

        if (except) {
            query._id = {
                $nin: [ObjectID(except.conID)]
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

    static async updContact(conID, name, email, phone) {
        try {
            const updResponse = await contacts.updateOne({
                _id: ObjectID(conID)
            }, {
                $set: {
                    name: name,
                    email: email,
                    phone: phone
                }
            })
            return updResponse
        } catch (e) {
            console.error(`Unable to update , ${e}`)
            return {
                error: e
            }
        }
    }

    static async delContact(conID) {
        try {
            const delResponse = await contacts.deleteOne({
                _id: ObjectID(conID)
            })
            return delResponse
        } catch (e) {
            console.error(`Unable to Delete , ${e}`)
            return {
                error: e
            }
        }
    }
}