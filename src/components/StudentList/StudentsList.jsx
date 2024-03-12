import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getMobileNo, setAdmno } from "../../../global";
function StudentsList () {

    let i = 0;
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [statusCheckingData, setStatusCheckingData] = useState([]);

    const getStdData = async () => {
        const mob = getMobileNo();
        const response = await fetch('http://localhost:8081/studentList')
        const result = await response.json();
        const details = [];
        result.forEach(each => {
            if (each.fmob === mob) {
                details.push(each);
            }
        });

        return details;
    }

    const getStaus = async () => {
        const mob = getMobileNo();
        const response = await fetch('http://localhost:8081/loginDetails')
        const result = await response.json();
        const statusValue = [];
        result.forEach(each => {
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
                    <div className="flex bg-slate-300 rounded-lg flex-col md:flex-row md:items-center md:justify-between md:space-y-0">
                        <div className=" p-4">
                            <h2 className="text-xl font-semibold">Students</h2>
                            <p className="mt-1 text-lg text-gray-700">
                                This is a list of all students registered with the given Mobile no.
                            </p>
                        </div>

                    </div>

                    <div className="mt-6 flex flex-col bg-slate-300 rounded-lg">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="rounded-lg">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                                                >
                                                    <span>Name</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-left text-lg font-normal text-gray-700"
                                                >
                                                    Father's Name
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-left text-lg font-normal text-gray-700"
                                                >
                                                    Mobile
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-lg font-normal text-gray-700"
                                                >
                                                    Action
                                                </th>



                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 rounded-lg">
                                            {data.map((person) => (
                                                <tr key={person.name}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover"
                                                                    // src={person.image}
                                                                    alt="image"
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                <div className="text-sm text-gray-700">Class :{' '}{person.class}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-sm text-gray-900 ">{person.fname}</div>
                                                        <div className="text-sm text-gray-700">Roll :{' '}{person.roll}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-12 py-4">
                                                        <div className="text-lg text-left text-gray-900 ">{person.fmob}</div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                        <NavLink to="/createNewUser">
                                                            <button
                                                                type="button"
                                                                className="flex p-2 items-center justify-center rounded-lg bg-blue-500   text-white hover:bg-blue-400/80"
                                                                onClick={() => {
                                                                    setAdmno(person.admno);
                                                                }}
                                                            >
                                                                <ArrowRight className="ml-2" size={16} />
                                                            </button>
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>)}
        </>
    )
}

export default StudentsList
