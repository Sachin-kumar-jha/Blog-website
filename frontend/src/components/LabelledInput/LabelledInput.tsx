import { ChangeEvent} from 'react';

interface LabelledInputType{
  label:string;
  placeholder:string;
  onChange:(e : ChangeEvent<HTMLInputElement>)=>void;
  type?:string;
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
  return <div className="w-full max-w-sm min-w-[200px]">
  <label className="block mb-2 text-sm text-black font-semibold pt-2">
     {label}
  </label>
  <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
    placeholder={placeholder} onChange={onChange} type={ type || "text"} required />
</div>

}

export default LabelledInput;