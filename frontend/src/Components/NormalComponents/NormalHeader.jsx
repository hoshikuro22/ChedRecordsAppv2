import { AiOutlineHome } from "react-icons/ai";
export default function NormalHeader() {

  return (
    <div className="bg-sky-950 top-0 right-0 h-14 items-center w-screen flex">
      <p>CHED RMIS</p>
<a href="/admin/adhome" className="text-white flex gap-2 font-medium hover:underline text-2xl ml-auto mr-20 ">
      <AiOutlineHome size="30px"/>
      <p >Home</p>
      </a>
    </div>
  );
}
