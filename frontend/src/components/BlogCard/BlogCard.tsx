import { Link } from "react-router-dom";
import  Avatar from "../Avatar/Avatar";
import Circle from "../Circle/Circle";
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





export default BlogCard