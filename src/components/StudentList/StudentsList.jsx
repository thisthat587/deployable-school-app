import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getMobileNo, setAdmno } from "../../../global";
function StudentsList() {

    let i = 0;
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [statusCheckingData, setStatusCheckingData] = useState([]);

    const getStdData = async () => {
        const mob = getMobileNo();
        const response = await fetch('/api/studentList')
        const result = await response.json();
        const details = [];
        result.message.forEach(each => {
            if (each.fmob === mob) {
                details.push(each);
            }
        });

        return details;
    }

    const getStaus = async () => {
        const mob = getMobileNo();
        const response = await fetch('/api/loginDetails')
        const result = await response.json();
        const statusValue = [];
        result.message.forEach(each => {
            if (each.uid === mob) {
                statusValue.push({ admno: each.admno, status: each.status });
            }
        });

        return statusValue;
    }


    useEffect(() => {
        getStdData().then(result => {
            setData(result);
            if (data) {
                setIsLoading(false);
            }
        });

        getStaus().then(result => {
            setStatusCheckingData(result)
        });
    }, [])

    return (
        <>
            {isLoading ? (<div className="flex items-center justify-center mt-96">
                <div className="border-t-8 border-blue-500 border-solid rounded-full animate-spin h-24 w-24"></div>
            </div>
            ) : (
                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                    <div className="bg-slate-300 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Students</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            This is a list of all students registered with the given mobile number.
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-2 py-3 text-left text-lg font-bold text-gray-700">Name</th>
                                        <th className="px-2 py-3 text-left text-lg font-bold text-gray-700">Father's Name</th>
                                        <th className="px-2 py-3 text-left text-lg font-bold text-gray-700">Mobile</th>
                                        <th className="px-2 py-3 text-left text-lg font-bold text-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.map((person) => (
                                        <tr key={person.name}>
                                            <td className="px-2 py-3">{person.name}</td>
                                            <td className="px-2 py-3">{person.fname}</td>
                                            <td className="px-2 py-3">{person.fmob}</td>
                                            <td className="px-2 py-3">
                                                <NavLink to="/createNewUser">
                                                    <button
                                                        type="button"
                                                        className="px-2 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-400"
                                                        onClick={() => {
                                                            setAdmno(person.admno);
                                                        }}
                                                    >
                                                        <ArrowRight className="mr-2" size={16} />
                                                    </button>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>)
            }
        </>
    )
}

export default StudentsList
