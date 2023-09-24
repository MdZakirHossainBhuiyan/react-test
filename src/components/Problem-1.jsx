import React, {useEffect, useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [inputValue, setInputValue] = useState({ name: '', status: '' });
    const [dataList, setDataList] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const sortedDataList = dataList.sort((a, b) => {
            if (a.status === 'active' && b.status !== 'active') {
                return -1;
            } else if (a.status === 'completed' && b.status !== 'active' && b.status !== 'completed') {
                return -1;
            } else {
                return 1;
            }
        });
        setFilteredData(sortedDataList);
    }, [dataList]);

    const handleClick = (val) =>{
        setShow(val);
    }

    useEffect(() => {
        if (show === 'all') {
            setFilteredData(dataList);
        } else if (show === 'active') {
            const filterData = dataList.filter((data) => data.status === 'active');
            setFilteredData(filterData);
        } else if (show === 'completed') {
            const filterData = dataList.filter((data) => data.status === 'completed');
            setFilteredData(filterData);
        }
    }, [show, dataList]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setDataList((prevDataList) => [...prevDataList, inputValue]);

        setInputValue({ name: '', status: '' });
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input onChange={handleChange} name='name' type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input onChange={handleChange} name='status' type="text" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData?.map((data, index) => (
                                    <tr key={index}>
                                        <td scope="col">{data?.name}</td>
                                        <td scope="col">{data?.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;