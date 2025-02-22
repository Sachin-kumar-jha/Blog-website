import { Link } from "react-router-dom";
 interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishDate:string;
    id:number|string;
 }
function BlogCard({authorName,title, content,publishDate,id}:BlogCardProps) {
  return (<Link to={`/blog/${id}`}>
    <div className="p-4  border-b border-slate-200 pb-4 w-screen max-w-screen-md curson-pointer">
        <div className="flex">
            <Avatar name={authorName.toUpperCase()} size="small"/>
        <div className="font-extralight pl-2 text-lg flex justify-center flex-col">{authorName}</div>
        <div className="flex justify-center flex-col pl-2" >
        <Circle/>
        </div>
        <div className="pl-2 tracking-normal text-slate-400 font-light text-sm flex justify-center flex-col">
            {publishDate}
            </div>
        </div>
    
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
    {`${Math.ceil(content.length / 100)} minute(s) read `}
        </div>
    </div>
    </Link>
  )
}


export function Avatar({name,size="small"}:{name:string,size:"small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 p-1 mt-1`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 ${size== "small"?"text-xs":"text-md"} `}>{name[0]}</span>
    </div>
    
}

function Circle(){
    return <div className="w-1 h-1 rounded-full bg-slate-600">
    </div>
}
export default BlogCard