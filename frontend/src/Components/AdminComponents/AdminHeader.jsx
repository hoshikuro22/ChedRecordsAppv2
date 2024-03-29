import { AiOutlineHome } from "react-icons/ai";


export default function AdminHeader() {

  return (
    <div className="bg-sky-950 top-0 right-0 h-14 items-center w-screen flex">

      <a href="/admin/adhome" className="text-white font-medium hover:underline text-2xl ml-auto mr-20 ">
        
      <AiOutlineHome size="30px"/> 
      </a>
     
    </div>
  );
}
