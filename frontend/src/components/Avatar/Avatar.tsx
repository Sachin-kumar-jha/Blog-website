
export default function Avatar({name,size="small"}:{name:string,size:"small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-1 mt-1`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 ${size== "small"?"text-xs":"text-md"} `}>{name[0]}</span>
    </div>
}