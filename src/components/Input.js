import { useState } from "react";

function Input(props){

    return <div className="flex flex-col gap-1">
        <label className=" font-semibold text-gray-900 text-sm">
            { props.label }
        </label>
        <input className={`p-2 rounded-sm shadow-sm border-b-2 border-t-0 border-r-0 border-l-0 outline-none text-sm text-gray-900 bg-slate-50 ${props.invalid ? 'border-red-500 ' : null}`} {...props} />
    </div>
};

export default Input;