import React from "react"
import { useRef } from "react"

import { NavLink } from "react-router-dom"
import { setAdmnoList, setMobileNo } from "../../../global";

export default function NewUser () {

    const mob = useRef();

    const makeAdmnoList = async () => {
        const mobile = mob.current.value;
        const response = await fetch('http://localhost:8081/studentList');
        const result = await response.json();
        const list = []
        result.map((each) => {
            if (each.fmob === mobile) {
                list.push(each.admno);
            }
        })
        setAdmnoList(list);
    }

    return (
        <div className="flex items-center justify-center bg-white m-44 rounded-lg ">
            <div className=" p-48 rounded-lg bg-slate-300">

                <div>
                    <h2 className="text-xl w-full h-12">Enter Registered Mobile No. to Search</h2>
                </div>
                <div>
                    <input
                        type="text"
                        className=" border ml-16 p-2 rounded-lg"
                        placeholder="Mobile No."
                        ref={mob}
                    />

                </div>
                <div className="py-2">
                    <NavLink to="/studentList">
                        <button
                            className="ml-32 py-1 mt-2 w-[120px] bg-blue-500 hover:bg-blue-400 text-2xl rounded"
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