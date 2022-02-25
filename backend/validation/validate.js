// import ContactModel from '../models/contacts.model.js';
import lodash from 'lodash'
const { isEmpty } = lodash

const Validate = (data) => {}

Validate.vali = (data) => {
    var errors = {};
    // console.log(data);

    if (!data.name) {
        errors.name = 'Name is required';
    } else if (data.name.length < 3) {
        errors.name = 'Name should be bigger than 3 chars'
    }

    let Etest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!Etest.test(data.email)) {
        errors.email = 'Enter Valid Email';
    }
    // else {
    //     console.log(ContactModel.uniqEmail(data.email, (err, rows) => {

    //     }));
    //     errors.email = 'Email Already Taken';
    // }

    let Ptest = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!data.phone) {
        errors.phone = 'Phone is required';
    } else if (!Ptest.test(data.phone)) {
        errors.phone = 'Enter Valid Phone';
    }
    // console.log(errors);
    if (isEmpty(errors)) {
        var status = true
    } else {
        var status = false
    }
    return {
        status: status,
        errors: errors,
        message: 'Please Correct Data'
    };
}

export default Validate