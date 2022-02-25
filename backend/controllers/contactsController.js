import ContactsModel from '../models/contacts.model.js'
import Validate from './../validation/validate.js'

export default class contactsController {

    static async getContacts(req, res) {
        const contactsPerPage = req.query.contactsPerPage ? parseInt(req.query.contactsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        if (req.query.name) {
            filters.name = req.query.name
        }
        if (req.query.email) {
            filters.email = req.query.email
        }
        if (req.query.phone) {
            filters.phone = req.query.phone
        }
        if (req.query.search) {
            filters.search = req.query.search
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
                    status: false,
                    error: 'Not found'
                })
                return
            }
            res.json(contacts)
            console.log('GET Contacts by ID');
        } catch (e) {
            console.error(`Error in get by Id , ${e}`)
            res.status(500).json({
                status: false,
                error: e
            })
        }
    }

    static async addContact(req, res) {
        try {
            var errors = Validate.vali(req.body)
            if (errors.status == true) {
                const name = req.body.name
                const email = req.body.email
                const phone = parseInt(req.body.phone)

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
                        status: true,
                        message: 'Contact Added'
                    })
                    console.log('POST Contact Added');
                } else {
                    res.json({
                        status: false,
                        message: 'Email Already Taken'
                    })
                }
            } else {
                res.json(errors)
            }
        } catch (e) {
            console.error(`Error in add Contact, ${e}`)
            res.status(500).json({
                status: false,
                error: e
            })
        }
    }

    static async updContact(req, res) {
        try {
            var errors = Validate.vali(req.body)
            if (errors.status == true) {
                const conID = req.body.conID
                const name = req.body.name
                const email = req.body.email
                const phone = parseInt(req.body.phone)

                let filters = {}
                let except = {}
                if (email && conID) {
                    filters.email = req.body.email
                    except.conID = req.body.conID
                }
                const {
                    totalNumContacts
                } = await ContactsModel.getContacts({
                    filters,
                    except
                })
                if (totalNumContacts == 0) {
                    const updResponse = await ContactsModel.updContact(
                        conID, name, email, phone
                    )
                    res.json({
                        status: true,
                        message: 'Contact Updated'
                    })
                    console.log('PUT Contact Updated');
                } else {
                    res.json({
                        status: false,
                        message: 'Email Already Taken'
                    })
                }
            } else {
                res.json(errors)
            }
        } catch (e) {
            console.error(`Error in upd Contact, ${e}`)
            res.status(500).json({
                status: false,
                error: e
            })
        }
    }

    static async delContact(req, res) {
        try {
            const conID = req.body.conID
            const delResponse = await ContactsModel.delContact(conID)
            res.json({
                status: true,
                message: 'Contact Deleted'
            })
            console.log('DELETE Contact Deleted');
        } catch (e) {
            console.error(`Error in del Contact, ${e}`)
            res.status(500).json({
                status: false,
                error: e
            })
        }
    }
}