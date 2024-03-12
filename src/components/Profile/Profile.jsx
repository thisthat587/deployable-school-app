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
        const response = await fetch('http://localhost:8081/studentList')
        const result = await response.json();
        result.forEach(each => {
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
            const response = await fetch('http://localhost:8081/transportFee');
            const result = await response.json();
            for (let i = 0; i < result.length; i++) {
                if (result[i].admno === admno) {
                    setTransFee(result[i].transportfee);
                    return;
                }
            }
        }

        const getDestValue = async () => {
            const admno = getAdmno();
            const response = await fetch('http://localhost:8081/destination');
            const result = await response.json();
            for (let i = 0; i < result.length; i++) {
                if (result[i].admno === admno) {
                    setDest(result[i].destination);

                    return;
                }
            }
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

        fetch('http://localhost:8081/updateName', {
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
        fetch('http://localhost:8081/updatefName', {
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
                <div className="w-[700px] bg-slate-300  mb-auto ml-auto mr-auto rounded-md border">
                    <div className=' bg-blue-500 flex justify-center items-center'>
                        {/* <img
                            className="p-2 h-[150px] w-[150px]  rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                            alt="Image"
                        /> */}
                        <ProfilePhotoInput />
                    </div>
                    <div className="p-4">
                        <h1 className="text-2xl text-center w-full bg-blue-500 text-white font-semibold">Profile</h1>
                        <hr />
                        <table className=' border'>
                            <tbody>

                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Name</label>
                                    </td>

                                    {isNameEditable ? (<td className='w-full border px-10'>
                                        <input
                                            className=' rounded-lg py-2 px-4 text-xl text-center'
                                            id="name"
                                            type="text"
                                            ref={name}
                                            value={data.name}
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
                                        />
                                    </td>) : (<td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 px-4 text-xl text-center' ref={name} id="name" type="text" value={data.name} readOnly={true}
                                        />
                                    </td>)}

                                    {isNameEditable ? (<td className=' px-2 border'>
                                        <Check
                                            className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                            style={{ padding: '4px' }}
                                            onClick={changeName}
                                        />
                                    </td>) :
                                        (<td className=' px-2 border'>
                                            <Edit2Icon
                                                className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                                style={{ padding: '4px' }}
                                                onClick={changeName}
                                            />
                                        </td>)
                                    }
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Father's Name</label>
                                    </td>

                                    {isfNameEditable ? (<td className='w-full border px-10'>
                                        <input
                                            className=' rounded-lg py-2 px-4 text-xl text-center'
                                            type="text"
                                            id="fname"
                                            ref={fname}
                                            value={data.fname}
                                            onChange={(e) => setData({ ...data, fname: e.target.value })}
                                            autoFocus={isfNameEditable}
                                        />
                                    </td>)
                                        : (<td className='w-full border px-10'>
                                            <input className=' rounded-lg py-2 px-4 text-xl text-center' ref={fname} id="fname"
                                                type="text" value={data.fname} readOnly />
                                        </td>)}
                                    {isfNameEditable ? (<td className=' px-2 border'>
                                        <Check className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                            style={{ padding: '4px' }}
                                            onClick={changefName}

                                        />
                                    </td>) : (<td className=' px-2 border'>
                                        <Edit2Icon className='hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                            style={{ padding: '4px' }}
                                            onClick={changefName}

                                        />
                                    </td>)}

                                </tr>
                                <tr>
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Mobile  </label>
                                    </td>

                                    <td className='w-full px-10'>
                                        <input className=' rounded-lg py-2 px-4 text-xl text-center' type="text" value={data.fmob} readOnly />
                                    </td>
                                    {/* <td className=' px-2 border'>
                                        <Edit2Icon className=' hover:bg-blue-400 bg-blue-500 rounded-lg size-8 text-white'
                                            style={{ padding: '4px' }}
                                        />
                                    </td> */}
                                </tr>
                            </tbody>

                        </table>
                        <h1 className='text-3xl flex text-center p-4'>
                            <FileAxis3D className=' rounded-lg size-10 text-black'
                                style={{ padding: '4px' }}
                            />
                            General Information
                        </h1>
                        <table>
                            <tbody>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Admission No.  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.admno} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Class  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.class} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Section  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.section} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Roll  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.roll} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Session  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.session} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Transport  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={data.transport} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Transport Fee  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={transFee} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl' htmlFor="name">Destination  </label>
                                    </td>

                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl text-center' type="text" value={dest} readOnly />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <NavLink to="/dashboard">
                            <button
                                type="button"
                                className="mt-4 w-full rounded-lg bg-blue-700  py-2 text-[20px] font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Back to Dashboard
                            </button>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>

    );

}

