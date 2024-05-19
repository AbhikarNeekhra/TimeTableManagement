import Link from "next/link";
import Navbar from "../../(Components)/Header/Navbar";
import "./dashboard.css";
import Header from "@/app/(Components)/Header/Header";
import { SidebarProvider } from "@/app/Context/SidebarContext";

export default function Dashboard() {
  return (

    <>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <div className="h-[82vh] w-full grid place-items-center md:flex md:justify-center md:items-center">
        <Link
          href="/seetimetable"
          className="bg-gradient-to-tr from-[#f9d1c7] to-[#FF4B77] backdrop:brightness-75 hover:bg-[rgba(0,0,0,0.3)] text-white h-[85%] w-[80%] md:w-[42%] mx-8 text-4xl md:text-7xl font-bold shadow-myShad4 hover:shadow-AbhiShad hover:rounded-3xl grid place-items-center py-11 md:py-32 px-4 cursor-pointer hover:text-5xl md:hover:text-8xl transition-all delay-100 ease-in-out"
        >
          <div className="mx-auto">CHECK</div>{" "}
          <div className="mx-auto">TIME</div>{" "}
          <div className="mx-auto">TABLE</div>
        </Link>
        <Link
          href="/adddata"
          className="bg-gradient-to-tr from-[#FE886A] to-[#fc7496] backdrop:brightness-75 hover:bg-[rgba(0,0,0,0.3)] text-white h-[85%] w-[80%] md:w-[42%] mx-8 text-4xl md:text-7xl font-bold shadow-myShad4 hover:shadow-AbhiShad hover:rounded-3xl grid place-items-center py-11 md:py-36 px-4 cursor-pointer hover:text-5xl md:hover:text-8xl transition-all delay-100 ease-in-out"
        >
          <div className="mx-auto">ADD</div>{" "}
          <div className="mx-auto">OR EDIT</div>{" "}
          <div className="mx-auto">DATA</div>
        </Link>
      </div>
      <main className="min-h-screen flex flex-col items-center justify-center py-2">
        <Link
          href="/seetimetable"
          className="bg-blue-500 text-white p-2 m-2 rounded-xl"
        >
          See Time Table
        </Link>
        <Link
          href="/adddata"
          className="bg-blue-500 text-white p-2 m-2 rounded-xl"
        >
          Add data
        </Link>
      </main>
    </>

    // <main className="min-h-screen flex flex-col items-center justify-center py-2">
    //   <Link
    //     href="/seetimetable"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     See Time Table
    //   </Link>
    //   <Link
    //     href="/electivecourse"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     Elective Course
    //   </Link>
    //   <Link
    //     href="/adddata"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     Add data
    //   </Link>
    //   <Link
    //     href="/student"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     Student
    //   </Link>
    //   <Link
    //     href="/faculty"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     Faculty
    //   </Link>
    //   <Link href="/admin" className="bg-blue-500 text-white p-2 m-2 rounded-xl">
    //     Admin
    //   </Link>
    //   <Link
    //     href="/moderator"
    //     className="bg-blue-500 text-white p-2 m-2 rounded-xl"
    //   >
    //     Moderator
    //   </Link>
    // </main>
  );
}
