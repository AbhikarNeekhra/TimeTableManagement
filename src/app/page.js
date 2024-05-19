import SessionClient from "./nextauth/SessionClient";
import SessionServer from "./nextauth/SessionServer";

// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <main className="min-h-screen">
        <SessionServer />
        <SessionClient />
        Home Page
      </main>
    </div>
  );
}
