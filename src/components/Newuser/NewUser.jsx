import React from "react"
import { useRef } from "react"

import { NavLink } from "react-router-dom"
import { setAdmnoList, setMobileNo } from "../../../global.js";

export default function NewUser() {

    const mob = useRef();

    const makeAdmnoList = async () => {
        const mobile = mob.current.value;
        const response = await fetch('/api/studentList');
        const result = await response.json();
        const list = []
        result.message.map((each) => {
            if (each.fmob === mobile) {
                list.push(each.admno);
            }
        })
        setAdmnoList(list);
    }

    return (
        <div className="flex items-center justify-center bg-white md:m-10 lg:m-20 rounded-lg">
            <div className="p-8 md:p-12 lg:p-16 rounded-lg bg-slate-300">
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl">Enter Registered Mobile No. to Search</h2>
                </div>
                <div className="mt-4">
                    <input
                        type="text"
                        className="border p-2 rounded-lg w-full md:w-64 lg:w-72"
                        placeholder="Mobile No."
                        ref={mob}
                    />
                </div>
                <div className="py-2 mt-4">
                    <NavLink to="/studentList">
                        <button
                            className="py-1 px-4 w-full md:w-[120px] bg-blue-500 hover:bg-blue-400 text-lg md:text-xl rounded"
                            onClick={() => {
                                setMobileNo(mob.current.value);
                                makeAdmnoList();
                            }}
                        >
                            Search
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>

    )
}