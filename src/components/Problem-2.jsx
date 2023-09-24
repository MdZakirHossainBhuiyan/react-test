import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Problem2 = () => {
    const [allContacts, setAllContacts] = useState([]);
    const [usContacts, setUsContacts] = useState([]);
    const [evenContacts, setEvenContacts] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [show, setShow] = useState('');
    const [isCheckClicked, setIsCheckClicked] = useState(true);
    const [modalC, setModalC] = useState(false);
    const [details, setDetails] = useState([]);

    const handleClose = () => {
        setModalC(false);
        setDetails([]);
        setOpen(false);
    }

    useEffect(() => {
        fetch('https://contact.mediusware.com/api/contacts/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setAllContacts(data?.results);

            const usData = data?.results?.filter(data => data?.country.name === 'United States');
            setUsContacts(usData)
        })
        .catch((err) => {
            
        });
    }, []);

    const handleShow = (value) => {
        setShow(value);
        setIsCheckClicked(true);
        handleOpen();
    }

    const handleModalC = (id, value) => {
        if(value === 'all'){
            const detailsData = allContacts.find(data => data?.id === id);
            setDetails(detailsData);
        }

        if(value === 'us'){
            const detailsData = allContacts.find(data => data?.id === id);
            setDetails(detailsData);
        }
        
        setModalC(true);
    }

    const handleCheckboxChange = (value) => {
        if(value === 'all'){
            const evenData = allContacts?.filter(data => data?.id % 2 === 0);

            setEvenContacts(evenData);
            isCheckClicked ? setIsCheckClicked(false) : setIsCheckClicked(true);
        }
        if(value === 'us'){
            const evenData = usContacts?.filter(data => data?.id % 2 === 0);

            setEvenContacts(evenData);
            isCheckClicked ? setIsCheckClicked(false) : setIsCheckClicked(true);
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => handleShow('all')} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={() => handleShow('us')} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
            </div>

            {
                (show === 'all') && 
                <div className='d-flex justify-content-center'>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h2 className='text-center pb-5' id="parent-modal-title">All Contacts</h2>

                            {
                                modalC ? 
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">{details?.id}</td>
                                                <td scope="col">{details?.phone}</td>
                                                <td scope="col">{details?.country?.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                isCheckClicked ?
                                                allContacts?.map((data, index) => (
                                                    <tr style={{cursor: 'pointer'}} onClick={() => handleModalC(data?.id, 'all')} key={index}>
                                                        <td scope="col">{data?.id}</td>
                                                        <td scope="col">{data?.phone}</td>
                                                        <td scope="col">{data?.country?.name}</td>
                                                    </tr>
                                                ))
                                                :
                                                evenContacts?.map((data, index) => (
                                                    <tr style={{cursor: 'pointer'}} onClick={() => handleModalC(data?.id, 'all')} key={index}>
                                                        <td scope="col">{data?.id}</td>
                                                        <td scope="col">{data?.phone}</td>
                                                        <td scope="col">{data?.country?.name}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <div className="form-check mt-3 mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="onlyEvenCheckbox"
                                    onChange={() => handleCheckboxChange('all')}
                                />
                                <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                                    Only Even
                                </label>
                            </div>

                            <button style={{color: '#46139f', marginRight:'10px'}} className='btn btn-lg btn-outline-primary' onClick={() => handleShow('us')} variant="outlined">US Contact</button>
                            <button style={{color: '#ff7f50'}} className='btn btn-lg btn-outline-primary' onClick={handleClose} variant="outlined">Close</button>
                        </Box>
                    </Modal>
                </div>
            }

            {
                (show === 'us') && 
                <div className='d-flex justify-content-center'>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <h2 className='text-center pb-5' id="parent-modal-title">All Contacts</h2>

                            {
                                modalC ? 
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td scope="col">{details?.id}</td>
                                                <td scope="col">{details?.phone}</td>
                                                <td scope="col">{details?.country?.name}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <table className="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th scope="col">Contact Number</th>
                                                <th scope="col">Country</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                isCheckClicked ?
                                                usContacts?.map((data, index) => (
                                                    <tr style={{cursor: 'pointer'}} onClick={() => handleModalC(data?.id, 'us')} key={index}>
                                                        <td scope="col">{data?.id}</td>
                                                        <td scope="col">{data?.phone}</td>
                                                        <td scope="col">{data?.country?.name}</td>
                                                    </tr>
                                                ))
                                                :
                                                evenContacts?.map((data, index) => (
                                                    <tr style={{cursor: 'pointer'}} onClick={() => handleModalC(data?.id, 'us')} key={index}>
                                                        <td scope="col">{data?.id}</td>
                                                        <td scope="col">{data?.phone}</td>
                                                        <td scope="col">{data?.country?.name}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }

                            <div className="form-check mt-3 mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="onlyEvenCheckbox"
                                    onChange={() => handleCheckboxChange('us')}
                                />
                                <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                                    Only Even
                                </label>
                            </div>

                            <button className='btn btn-lg btn-outline-primary mr-1' onClick={() => handleShow('all')} variant="outlined">All Contact</button>
                            <button className='btn btn-lg btn-outline-primary' onClick={handleClose} variant="outlined">Close</button>
                        </Box>
                    </Modal>
                </div>
            }
            
        </div>
    );
};

export default Problem2;