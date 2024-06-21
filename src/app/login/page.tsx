import Image from "next/image";
import Topbar from "@/components/topbar";
export default function Home() {
  return (
    <div className="h-screen">
      <Topbar />
      <div className="flex flex-col h-5/6 items-center justify-center py-2">
        <div className="bg-primary md:h-4/5 h-5/6 md:w-2/3 w-5/6 rounded-lg mt-auto mb-auto">
          <p>Login</p>
        </div>
      </div>
    </div>
  );
}
