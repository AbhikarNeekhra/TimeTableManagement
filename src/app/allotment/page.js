import Header from "../(Components)/Header/Header";
import { SidebarProvider } from "@/app/Context/SidebarContext";
import AllotFilter from "./allotfilter";

export default function Allotment() {
  return (
    <>
      <SidebarProvider>
        <Header />
      </SidebarProvider>
      <AllotFilter />
    </>
  );
}
