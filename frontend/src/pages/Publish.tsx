import { useState, useRef } from "react";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/Spinner/ButtonSpinner";
import { toast } from "react-toastify";
import { CreateBlogInput } from "@sachin.78dev/blog-common";

function Publish() {

  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const sendPost = async () => {
    setLoading(true);
    const postData:CreateBlogInput = {
          title: titleRef.current?.value || '',
          content: contentRef.current?.value || '',
        };
    if (!postData) {
      toast.warning("please enter data");
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
        postData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      navigate(`/blog/${response.data.id}`);
    } catch{
      toast.warning("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full mt-10">
        <input
          ref={titleRef}
          type="text"
          className="w-full bg-white shadow-sm border-b text-gray-900 text-md rounded-md focus:outline-none focus:border-slate-200 block w-full p-5"
          placeholder="Title"
          required
        />
        <TextArea onChange={() =>{}} ref={contentRef} />
        <div className="ml-6 lg:ml-4">
          <button
            onClick={sendPost}
            type="submit"
            className="inline-flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-center text-green-800 border-b bg-transparent shadow-md rounded-lg focus:ring-blue-200 hover:bg-slate-200"
          >
            {loading ? <ButtonSpinner /> : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Publish;
