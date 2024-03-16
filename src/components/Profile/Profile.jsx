import React, { useEffect, useRef, useState } from 'react'
import { Check, Edit2Icon, FileAxis3D, Save } from 'lucide-react'
import { getAdmno } from '../../../global';
import { NavLink } from 'react-router-dom';
import ProfilePhotoInput from '../profilePhotoInput/ProfilePhotoInput';
// import { format } from 'mysql2';

export default function Profile() {

    const name = useRef();
    const fname = useRef();

    const [data, setData] = useState({});

    const [transFee, setTransFee] = useState('');

    const [dest, setDest] = useState('')

    const [isLoading, setIsLoading] = useState(true);

    const [isNameEditable, setIsNameEditable] = useState(false);
    const [isfNameEditable, setIsfNameEditable] = useState(false);


    const getStdData = async () => {
        const admno = getAdmno();
        const response = await fetch('/api/studentList')
        const result = await response.json();
        result.message.forEach(each => {
            if (each.admno === admno) {
                setData(each);

                if (data) {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }
                console.log(data);
                return;
            }
        });

        const getTransFee = async () => {
            const admno = getAdmno();
            const response = await fetch('/api/transportFee');
            const result = await response.json();
            // for (let i = 0; i < result.message.length; i++) {
            //     if (result.message[i].admno === admno) {
            //         setTransFee(result[i].transportfee);
            //         return;
            //     }
            // }
            result.message.forEach((each) => {
                if (each.admno === admno) {
                    setTransFee(each.transportfee);
                    return;
                }
            })
        }

        const getDestValue = async () => {
            const admno = getAdmno();
            const response = await fetch('/api/destination');
            const result = await response.json();
            // for (let i = 0; i < result.message.length; i++) {
            //     if (result.message[i].admno === admno) {
            //         setDest(result[i].destination);

            //         return;
            //     }
            // }
            result.message.forEach((each) => {
                if (each.admno === admno) {
                    setDest(each.destination);
                    return;
                }
            })
        }

        getDestValue();

        getTransFee();

    }

    const changeName = () => {
        setIsNameEditable(!isNameEditable);
        document.getElementById('name').focus();

        const stdName = name.current.value;

        const nameData = {
            name: stdName,
            admno: data.admno
        };

        fetch('api/updateName', {
            method: 'POST',                           //|
            headers: {                                //|  
                'Content-Type': 'application/json',     //| (request body to send to the server)
            },                                        //|
            body: JSON.stringify(nameData),               //|
        })
            .then(response => response.json())
            .then(result => {
                console.log('Data inserted successfully:', result);
                // You can perform additional actions after successful insertion
            })
            .catch(error => {
                console.error('Error inserting data:', error);
                // Handle the error appropriately
            });
    }

    const changefName = () => {
        setIsfNameEditable(!isfNameEditable);
        document.getElementById('fname').focus();

        const stdfName = fname.current.value;

        const fNameData = {
            fname: stdfName,
            admno: data.admno,
        };
        fetch('api/updatefName', {
            method: 'POST',                           //|
            headers: {                                //|  
                'Content-Type': 'application/json',     //| (request body to send to the server)
            },                                        //|
            body: JSON.stringify(fNameData),               //|
        })
            .then(response => response.json())
            .then(result => {
                console.log('Data inserted successfully:', result);
                // You can perform additional actions after successful insertion
            })
            .catch(error => {
                console.error('Error inserting data:', error);
                // Handle the error appropriately
            });
    }


    useEffect(() => {
        getStdData();
    }, [])

    return (

        <div>
            {isLoading ? (<div className="flex items-center justify-center mt-96">
                <div className="border-t-8 border-blue-500 border-solid rounded-full animate-spin h-24 w-24"></div>
            </div>
            ) : (
                <div className="w-full md:w-[700px] mb-auto mx-auto rounded-md border">
                    <div className='bg-blue-500 flex justify-center items-center'>
                        {/* <img
                        className="p-2 h-[150px] w-[150px]  rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                        alt="Image"
                    /> */}
                        <ProfilePhotoInput />
                    </div>
                    <div className="w-full md:max-w-[700px] mb-auto mx-auto rounded-md border">
                        <h1 className="text-2xl text-center w-full bg-blue-500 text-white font-semibold">Profile</h1>
                        <div className="overflow-x-auto">
                            <table className='w-full md:w-auto'>
                                <tbody>
                                    <tr>
                                        <td className='w-full md:w-[30%] border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="name">Name</label>
                                        </td>
                                        {isNameEditable ? (
                                            <td className='w-full md:w-[40%] border px-4 md:px-10'>
                                                <input
                                                    className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center'
                                                    id="name"
                                                    type="text"
                                                    ref={name}
                                                    value={data.name}
                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                />
                                            </td>
                                        ) : (
                                            <td className='w-full md:w-[40%] border px-4 md:px-10'>
                                                <input
                                                    className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center'
                                                    ref={name}
                                                    id="name"
                                                    type="text"
                                                    value={data.name}
                                                    readOnly
                                                />
                                            </td>
                                        )}
                                        {isNameEditable ? (
                                            <td className='w-full md:w-[30%] px-2 border'>
                                                <Check
                                                    className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                                    style={{ padding: '4px' }}
                                                    onClick={changeName}
                                                />
                                            </td>
                                        ) : (
                                            <td className='w-full md:w-[30%] px-2 border'>
                                                <Edit2Icon
                                                    className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                                    style={{ padding: '4px' }}
                                                    onClick={changeName}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-[30%] border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="fname">Father's Name</label>
                                        </td>
                                        {isfNameEditable ? (
                                            <td className='w-full md:w-[40%] border px-4 md:px-10'>
                                                <input
                                                    className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center'
                                                    type="text"
                                                    id="fname"
                                                    ref={fname}
                                                    value={data.fname}
                                                    onChange={(e) => setData({ ...data, fname: e.target.value })}
                                                    autoFocus={isfNameEditable}
                                                />
                                            </td>
                                        ) : (
                                            <td className='w-full md:w-[40%] border px-4 md:px-10'>
                                                <input
                                                    className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center'
                                                    ref={fname}
                                                    id="fname"
                                                    type="text"
                                                    value={data.fname}
                                                    readOnly
                                                />
                                            </td>
                                        )}
                                        {isfNameEditable ? (
                                            <td className='w-full md:w-[30%] px-2 border'>
                                                <Check
                                                    className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                                    style={{ padding: '4px' }}
                                                    onClick={changefName}
                                                />
                                            </td>
                                        ) : (
                                            <td className='w-full md:w-[30%] px-2 border'>
                                                <Edit2Icon
                                                    className='hover:bg-blue-400 bg-blue-500  rounded-lg size-8 text-white'
                                                    style={{ padding: '4px' }}
                                                    onClick={changefName}
                                                />
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-[30%] border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="fmob">Mobile</label>
                                        </td>
                                        <td className='w-full md:w-[40%] border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.fmob} readOnly />
                                        </td>
                                        {/* You can add edit icon if required */}
                                        <td className='w-full md:w-[30%] px-2 border'></td>
                                    </tr>
                                    {/* Add similar adjustments for other table rows */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* <h1 className='text-3xl flex text-center p-4'>
                            <FileAxis3D className=' rounded-lg size-10 text-black'
                                style={{ padding: '4px' }}
                            />
                            General Information
                        </h1> */}
                    <div className="w-full md:max-w-[700px] mb-auto mx-auto rounded-md border">
                        <h1 className='text-3xl flex justify-center items-center p-4'>
                            <FileAxis3D className='rounded-lg size-10 text-black' style={{ padding: '4px' }} />
                            General Information
                        </h1>
                        <div className="overflow-x-auto">
                            <table className='w-full md:min-w-max'>
                                <tbody>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="admno">Admission No.</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.admno} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="class">Class</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.class} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="section">Section</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.section} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="roll">Roll</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.roll} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="session">Session</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.session} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="transport">Transport</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={data.transport} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="transFee">Transport Fee</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={transFee} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <label className='bg-transparent py-2 mr-2 text-lg md:text-base' htmlFor="dest">Destination</label>
                                        </td>
                                        <td className='w-full md:w-auto border px-4 md:px-10'>
                                            <input className='rounded-lg py-2 px-2 md:px-4 text-lg md:text-base text-center' type="text" value={dest} readOnly />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <NavLink to="/dashboard">
                        <button
                            type="button"
                            className="mt-4 w-full md:w-auto rounded-lg bg-blue-700 py-2 text-lg md:text-2xl font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Back to Dashboard
                        </button>
                    </NavLink>

                </div>
                // </div>
            )}
        </div>

    );

}

