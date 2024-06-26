"use client";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
interface TopbarProps {
  isLoggedIn: boolean;
}

export default function Topbar({
  isLoggedIn: isLoggedIn = false,
}: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.post("/api/user/logout");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div className="flex justify-between p-5 ">
      <button onClick={toggleTheme}>
        <MdOutlineWbSunny size={25} />
      </button>
      <div className="w-full">
        <div
          className="cursor-pointer ml-auto mr-auto text-center justify-center w-max"
          onClick={() => {
            router.push("/");
          }}
        >
          <p className="text-2xl  mt-1 tracking-widest">
            <span className="font-bold">PASS</span>
            <span className="font-medium">MATE</span>
          </p>
        </div>
      </div>
      <div>
        {isLoggedIn && (
          <button onClick={logout}>
            <MdLogout size={25} />
          </button>
        )}
      </div>
    </div>
  );
}
