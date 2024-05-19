import Header from "@/app/(Components)/Header/Header";
import { SidebarProvider } from "@/app/Context/SidebarContext";

export default function adddata({ children }) {
  return (
    <>
      <div>
        <SidebarProvider>
          <Header />
        </SidebarProvider>
        {children}
      </div>
    </>
  );
}
