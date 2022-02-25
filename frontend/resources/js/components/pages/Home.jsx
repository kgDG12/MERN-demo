import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ConList from '../parts/ConList';
import Form from '../parts/Form';

export default function Home({ url, ...props }) {
    const [contacts, setContacts] = useState([])
    const [showform, ShowForm] = useState(false)
    const [idVal, SetIdVal] = useState('')
    const [nameVal, SetNameVal] = useState('')
    const [emailVal, SetEmailVal] = useState('')
    const [phoneVal, SetPhoneVal] = useState('')
    const [formErrs, SetFormErrs] = useState({})
    const [formUpd, SetFormUpd] = useState(false)
    const [searchStr, SetSearchStr] = useState('')

    useEffect(() => {
        document.title = "Home";
        fetchContacts();
    }, [searchStr]);

    const showFormClick = () => {
        ShowForm(!showform)
    }

    const fetchContacts = async () => {
        if (searchStr != '') {
            axios
                .get(`${url}/api/contacts?name=${searchStr}`)
                .then(res => {
                    setContacts(res.data.contacts)
                })
                .catch(err => console.log(err))
        } else {
            await axios
                .get(`${url}/api/contacts`)
                .then(res => {
                    setContacts(res.data.contacts)
                })
                .catch(err => console.log(err))
        }
    }

    const formSub = () => {
        var data = {
            conID: idVal,
            name: nameVal,
            email: emailVal,
            phone: phoneVal
        }
        if (idVal != '') {
            axios
                .put(`${url}/api/contacts/upd`, data)
                .then(res => {
                    if (res.data.status) {
                        fetchContacts()
                        alert(res.data.message)
                        SetNameVal('')
                        SetEmailVal('')
                        SetPhoneVal('')
                        SetIdVal('')
                        SetFormErrs({})
                        SetFormUpd(false)
                    } else {
                        SetFormErrs(res.data.errors)
                        alert(res.data.message)
                    }
                })
                .catch(err => console.log(err))

        } else {
            axios
                .post(`${url}/api/contacts/add`, data)
                .then(res => {
                    if (res.data.status) {
                        fetchContacts()
                        alert(res.data.message)
                        SetNameVal('')
                        SetEmailVal('')
                        SetPhoneVal('')
                        SetIdVal('')
                        SetFormErrs({})
                    } else {
                        SetFormErrs(res.data.errors)
                        alert(res.data.message)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const delClick = (id, name) => {
        if (confirm('Are You Sure to Delete ' + name + '\'s Contact? ')) {
            var data = { conID: id }
            axios
                .delete(`${url}/api/contacts/del`, { data: data })
                .then(res => {
                    let status = res.data.status
                    if (status) {
                        fetchContacts()
                        alert(name + '\'s Contact Deleted...')
                    } else {
                        alert('Delete Failed...')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="container mt-4">
            <Form
                showFormClick={showFormClick}
                showform={showform} formSub={formSub}
                formVals={{ nameVal, emailVal, phoneVal }}
                SetFormVals={{ SetNameVal, SetEmailVal, SetPhoneVal, SetIdVal, SetFormErrs, SetFormUpd }}
                formErrs={formErrs}
                formUpd={formUpd}
                SetSearchStr={SetSearchStr} />

            <ConList
                contacts={contacts}
                SetFormUpd={{ SetFormUpd, ShowForm }}
                SetFormVals={{ SetIdVal, SetNameVal, SetEmailVal, SetPhoneVal }}
                delClick={delClick} />
        </div>
    );
}