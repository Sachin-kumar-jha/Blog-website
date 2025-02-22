function BlogCardSkeleton() {
    return (
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded w-20"></div>
          <div className="ml-2 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="ml-2 h-4 bg-gray-300 rounded w-24"></div>
        </div>
  
        <div className="h-6 bg-gray-300 rounded w-3/4 mt-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
  
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-4"></div>
      </div>
    );
  }
  
  export default BlogCardSkeleton;