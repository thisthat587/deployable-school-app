import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'

import { getAdmno, setAdmno } from '../../../global';


export default function Dashboard() {
    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [admno, setAdmno] = useState('');

    const getStdData = async () => {
        try {
            const response = await fetch('/api/studentList');
            const result = await response.json();
            setAdmno(getAdmno());

            result.message.forEach(each => {
                if (each.admno === admno) {
                    setData(each);
                    setIsLoading(false);
                    return;
                }
            });
        } catch (error) {
            console.error('Error fetching student data:', error);
            // Handle error if needed
            setIsLoading(false); // Make sure to set loading state in case of an error
        } finally {
            // if (admno !== '') {
            setTimeout(() => {

                setIsLoading(false); // Make sure to set loading state in case of an error
            }, 5000);
            // }

        }
    };

    useEffect(() => {
        getStdData();
    }, [admno]);



    return (
        <div>
            {isLoading ? (<div className="flex items-center justify-center mt-96">
                <div className="border-t-8 border-blue-500 border-solid rounded-full animate-spin h-24 w-24"></div>
            </div>) : !data ? (<div className="py-10">
                <div className="text-center">
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-x-3">
                        <NavLink to="/">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Go back
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            ) : (
                <div className="bg-slate-300 mx-auto mt-2 mb-auto rounded-md border md:w-3/4 lg:w-[700px]">
                    <div className="bg-blue-500 flex justify-center items-center">
                        <img
                            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                            alt="Image"
                            className="p-2 h-24 w-24 md:p-4 md:h-32 md:w-32 rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-3xl p-4 text-center font-semibold">DASHBOARD</h1>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Name</label>
                                <input className="input-field" type="text" value={data.name} readOnly />
                            </div>
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Father's Name</label>
                                <input className="input-field" type="text" value={data.fname} readOnly />
                            </div>
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Admission No.</label>
                                <input className="input-field" type="text" value={data.admno} readOnly />
                            </div>
                            {/* <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Session</label>
                                <input className="input-field" type="text" value={data.session} readOnly />
                            </div> */}
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Class</label>
                                <input className="input-field" type="text" value={data.class} readOnly />
                            </div>
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Roll</label>
                                <input className="input-field" type="text" value={data.roll} readOnly />
                            </div>
                            <div>
                                <label className="block bg-transparent py-2 text-xl md:text-2xl">Section</label>
                                <input className="input-field" type="text" value={data.section} readOnly />
                            </div>
                            <div className="flex justify-center items-center">
                                <div>
                                    <NavLink to="/profile">
                                        <button className="button">Profile</button>
                                    </NavLink>
                                    <button className="button">Fees Status</button>
                                    <button className="button">Notice</button>
                                    <button className="button">Exam Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
