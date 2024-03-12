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
            const response = await fetch('http://localhost:8081/studentList');
            const result = await response.json();
            setAdmno(getAdmno());

            result.forEach(each => {
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
                <div className=" bg-slate-300 w-[700px] mt-2 mb-auto ml-auto mr-auto rounded-md border">
                    <div className='flex justify-center bg-blue-500 items-center'>
                        <img
                            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                            alt="Image"
                            className="p-2 h-[150px] w-[150px] rounded-full object-cover"
                        />
                    </div>
                    <table className=' border w-full'>
                        <tbody>
                            <tr>
                                <td>
                                    <h1 className="text-3xl p-4 text-center font-semibold">DASHBOARD</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-4">
                        <table className='border'>
                            <tbody>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl'  >Name  </label>
                                    </td>
                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 px-4 text-xl text-center' type="text" value={data.name} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl'  >Father's Name  </label>
                                    </td>
                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl px-4 text-center' type="text" value={data.fname} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl'  >Admission No.  </label>
                                    </td>
                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl px-4 text-center' type="text" value={data.admno} readOnly />
                                    </td>
                                </tr>
                                <tr >
                                    <td className='w-full border px-10'>
                                        <label className=' bg-transparent py-2 mr-2 text-xl'  >Session  </label>
                                    </td>
                                    <td className='w-full border px-10'>
                                        <input className=' rounded-lg py-2 text-xl px-4 text-center' type="text" value={data.session} readOnly />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='border'>
                            <tbody >
                                <tr>
                                    <td className='w-auto  px-10 text-center'>
                                        <label className='w-[50px] bg-transparent py-2 text-xl'  >Class  </label>
                                        <input className='w-[80px] mb-2   rounded-lg py-2 text-xl text-center' type="text" value={data.class} readOnly />
                                    </td>
                                    <td className='w-auto px-10 text-center'>

                                        <label className='w-[50px] bg-transparent py-2  text-xl'  >Roll  </label>
                                        <input className='w-[80px] mb-2 rounded-lg py-2 text-xl text-center' type="text" value={data.roll} readOnly />
                                    </td>
                                    <td className='w-auto px-14 text-center'>
                                        <label className='w-[50px] bg-transparent py-2  text-xl'  >Section  </label>
                                        <input className='w-[80px] mb-2 rounded-lg py-2 text-xl text-center' type="text" value={data.section} readOnly />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center mb-4">
                        <div >

                            <NavLink to="/profile">
                                <button
                                    type="button"
                                    className="mt-4 w-[150px] rounded-lg bg-blue-500  py-2 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Profile
                                </button>
                            </NavLink >
                            <button
                                type="button"
                                className="mt-4 w-[150px] ml-4 rounded-lg bg-blue-500 px-3.5 py-2 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Fees Status
                            </button>
                            <button
                                type="button"
                                className="mt-4 w-[150px] ml-4 rounded-lg bg-blue-500 px-3.5 py-2 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Notice
                            </button>
                            <button
                                type="button"
                                className="mt-4 w-[150px] ml-4 rounded-lg bg-blue-500 px-3.5 py-2 text-[15px] font-semibold text-white shadow-sm hover:bg-blue-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Exam Report
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}
