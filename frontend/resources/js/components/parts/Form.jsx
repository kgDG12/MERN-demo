import React from 'react'

export default function Form({ showFormClick, showform, formSub, formVals, SetFormVals, formErrs, formUpd, SetSearchStr, ...props }) {

    const handleChange = (fname, e) => {
        switch (fname) {
            case 'name':
                SetFormVals.SetNameVal(e.target.value)
                break;
            case 'email':
                SetFormVals.SetEmailVal(e.target.value)
                break;
            case 'phone':
                SetFormVals.SetPhoneVal(e.target.value)
                break;
            case 'submit':
                formSub()
                break;
            case 'reset':
                SetFormVals.SetNameVal('')
                SetFormVals.SetEmailVal('')
                SetFormVals.SetPhoneVal('')
                SetFormVals.SetIdVal('')
                SetFormVals.SetFormErrs({})
                SetFormVals.SetFormUpd(false)
                break;
            case 'search':
                SetSearchStr(e.target.value)
                break;
        }
    }
    return (
        <div className='container'>
            <div className="container-fluid">
                <div className="d-flex">
                    <button onClick={() => showFormClick()} className={'btn btn-' + (showform ? 'danger' : 'primary')} >
                        {showform ? 'Close' : 'Open'} Form
                    </button>
                    <form onSubmit={(e) => e.preventDefault()} className="d-flex ms-auto">
                        <input type="search" onChange={(e) => handleChange('search', e)} placeholder="Search" aria-label="Search" className="form-control" />
                        {/* <button onClick={(e) => { }} type="submit" className="btn btn-outline-success">
                        Search
                    </button> */}
                    </form>
                </div>
                {showform ?
                    <div className="container-fluid w-75">
                        <div className="row">
                            <div className="col-12 text-center mb-4">
                                <h2>{!formUpd ? 'Add' : 'Update'} Contact</h2>
                            </div>
                            <div className="col-12 text-center">
                                <div className="row">
                                    <form onSubmit={(e) => e.preventDefault} className="row g-3 needs-validation my-4">
                                        <div className="col">
                                            <label className="form-label">Name</label>
                                            <input type="text" value={formVals.nameVal} onChange={(e) => handleChange('name', e)} required="required" className="form-control" />
                                            <div className="text-danger">{formErrs ? formErrs.name : ''}</div>
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Email</label>
                                            <input type="email" value={formVals.emailVal} onChange={(e) => handleChange('email', e)} required="required" className="form-control" />
                                            <div className="text-danger">{formErrs ? formErrs.email : ''}</div>
                                        </div>
                                        <div className="col">
                                            <label className="form-label">Phone</label>
                                            <input type="text" value={formVals.phoneVal} onChange={(e) => handleChange('phone', e)} required="required" className="form-control" />
                                            <div className="text-danger">{formErrs ? formErrs.phone : ''}</div>
                                        </div>
                                        <div className="col-12 text-center">
                                            <button onClick={(e) => { e.preventDefault(); handleChange('submit') }} type="submit" className="btn btn-primary me-2" className={'btn me-2 btn-' + (!formUpd ? 'primary' : 'success')}>
                                                {!formUpd ? 'Add' : 'Update'}
                                            </button>
                                            <button onClick={(e) => { e.preventDefault(); handleChange('reset') }} className="btn btn-secondary">
                                                Reset
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}