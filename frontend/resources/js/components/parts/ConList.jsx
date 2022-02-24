import React from 'react'

export default function ConList({ contacts, SetFormUpd, SetFormVals, delClick, ...props }) {
    const EditHandle = (item) => {
        SetFormUpd.SetFormUpd(true)
        SetFormUpd.ShowForm(true)
        SetFormVals.SetIdVal(item.id)
        SetFormVals.SetNameVal(item.name)
        SetFormVals.SetEmailVal(item.email)
        SetFormVals.SetPhoneVal(item.phone)
    }
    return (
        <div className="container">
            <div className="container-fluid">
                <h2 className='text-center mb-3'>Contacts</h2>
                <div className="row">
                    {contacts.length ?
                        contacts.map((item, i) =>
                            <div key={item.id} className="col-4 mb-4">
                                <div className="card text-white border-secondary">
                                    <div className="card-header bg-dark">
                                        <h5 className="card-title">{item.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="card-subtitle mb-2 text-muted">
                                                    Email: {item.email}
                                                </h6>
                                                <h6 className="card-subtitle mb-2 text-muted">
                                                    Phone: {item.phone}
                                                </h6>
                                            </div>
                                            <div className="col-4">
                                                <button onClick={() => EditHandle(item)} className='btn btn-sm btn-success me-2'>Edit</button>
                                                <button onClick={() => delClick(item.id, item.name)} className='btn btn-sm btn-danger'>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <div className="col-12 my-4">
                            <h4 className='text-center'>No Contacts Found</h4>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
