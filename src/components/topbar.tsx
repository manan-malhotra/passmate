"use client";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
export default function Topbar() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <div className="flex justify-between p-5 ">
      <div className="w-full">
        <p
          className="ml-auto mr-auto text-center justify-center  mt-1 tracking-widest"
          onClick={toggleTheme}
        >
          <span className="font-bold">PASS</span>
          <span className="font-medium">MATE</span>
        </p>
      </div>
      <div>
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <MdOutlineWbSunny size={25} color="white" />
          ) : (
            <MdOutlineWbSunny size={25} />
          )}
        </button>
      </div>
    </div>
  );
}
