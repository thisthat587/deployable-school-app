import React, { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAdmno, getMobileNo } from '../../../global';

export default function createNewUser () {
    let user = useRef();

    const pin = useRef();

    const OTP = useRef();
    //OTP variable ke help se OTP fetch krega input field se aur validate krega ki jo otp bheja gya h mobile p ye wahi h ki nhi uske baad isVerified variable ko true krega.

    // yaha pe studentList page se mobile no aur admno ayga usi ko insert query m bhjna h isliye phle se daal diye h pass krne k liye context api sikhna sikhna hga.....

    const [admno, setAdmno] = useState(getAdmno());

    const [mob, setMob] = useState(getMobileNo());

    const [isVerified, setIsVerified] = useState(false);
    const insertValue = () => {
        const userID = user.current.value;
        const PIN = pin.current.value;
        const data = {
            admno: admno,
            userID: userID,
            PIN: PIN
        };
        fetch('http://89.117.188.154:8081/getQuery', {
            method: 'POST',                           //|
            headers: {                                //|  
                'Content-Type': 'application/json',     //| (request body to send to the server)
            },                                        //|
            body: JSON.stringify(data),               //|
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
    };

    return (
        <section className='mt-24'>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex bg-slate-300 items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Create New user</h2>
                        <br />
                        <hr />
                        <br />
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Enter OTP sent to your registered Mobile No.{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="bg-white flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Enter OTP"
                                        ref={OTP}
                                    ></input>
                                </div>
                                <div className='mt-2 flex justify-center items-center text-white text-lg'>
                                    <button className="w-[120px] bg-blue-500 hover:bg-blue-400  py-2 rounded-lg"
                                        onClick={() => {
                                            setIsVerified(true);
                                            user.current.value = mob;
                                            // yaha pe OTP verify karega.....
                                        }}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    User ID{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="bg-white flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter UserID"
                                        id="userid"
                                        ref={user}
                                        readOnly
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        {' '}
                                        PIN{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="bg-white flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Enter PIN"
                                        id="PIN"
                                        ref={pin}
                                    ></input>
                                </div>
                            </div>
                            <div>
                                {/* <NavLink to="/">

                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2 font-semibold leading-7 text-white hover:bg-blue-400/80"
                                        onClick={() => {
                                            if (isVerified) {
                                                alert("Account Created");
                                            } else {
                                                alert("Please Verify OTP first");
                                            }
                                        }}
                                    >
                                        Create User <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </NavLink> */}
                                <NavLink to="/" onClick={() => {
                                    if (isVerified) {
                                        alert("Account Created" + "\nUser ID : " + user.current.value + "\nPIN : " + pin.current.value);
                                    } else {
                                        alert("Please Verify OTP first");
                                    }
                                }}>

                                    <button
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-3.5 py-2 font-semibold leading-7 text-white hover:bg-blue-400/80 ${!isVerified && 'cursor-not-allowed'}`}
                                        disabled={!isVerified}
                                        onClick={() => {
                                            insertValue()
                                        }}
                                    >
                                        Set PIN <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-full">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section >
    )
}
