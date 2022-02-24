import ContactsModel from '../models/contacts.model.js'

export default class contactsController {

    static async getContacts(req, res) {
        const contactsPerPage = req.query.contactsPerPage ? parseInt(req.query.contactsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.name) {
            filters.name = req.query.name
        } else if (req.query.email) {
            filters.email = req.query.email
        }

        const {
            contactsList,
            totalNumContacts
        } = await ContactsModel.getContacts({
            filters,
            page,
            contactsPerPage,
        })

        let response = {
            contacts: contactsList,
            page: page,
            filters: filters,
            entries_per_page: contactsPerPage,
            total_results: totalNumContacts
        }
        res.json(response)
        console.log('GET Contacts');
    }

    static async getContactByID(req, res) {
        try {
            let id = req.params.id || {}
            let contacts = await ContactsModel.getContactByID(id)

            if (!contacts) {
                res.status(404).json({
                    error: 'Not found'
                })
                return
            }
            res.json(contacts)
            console.log('GET Contacts by ID');
        } catch (e) {
            console.error(`Error in get by Id , ${e}`)
            res.status(500).json({
                error: e
            })
        }
    }

    static async addContact(req, res) {
        try {
            const name = req.body.name
            const email = req.body.email
            const phone = req.body.phone

            let filters = {}
            if (email) {
                filters.email = req.body.email
            }
            const {
                totalNumContacts
            } = await ContactsModel.getContacts({
                filters
            })
            if (totalNumContacts == 0) {
                const addResponse = await ContactsModel.addContact(
                    name, email, phone
                )
                res.json({
                    status: 'Success'
                })
                console.log('POST Contact Added');
            } else {
                res.status(400).json({
                    error: 'Email Already Taken'
                })
            }
        } catch (e) {
            console.error(`Error in add Contact, ${e}`)
            res.status(500).json({
                error: e
            })
        }
    }
}