
export default function Avatar({name,size="small",className,spanClass}:{name:string,size:"small" | "big",className?:string,spanClass?:string}){
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-indigo-400 rounded-full  p-1 mt-1 ${className}`}>
        <span className={`font-medium text-white  ${size== "small"?"text-xs":"text-md"} ${spanClass}`}>{name[0]}</span>
    </div>
}