"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [userKeys, setUserKeys] = useState([]);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const logout = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/user/getProfile");
      console.log(res.data);
      setUsername(res.data.user.username);
      setUserKeys(res.data.userData);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  if (username == "") return <></>;
  return (
    <div className="h-screen">
      <Topbar />
      <div>
        <p className="text-center">
          Hello {username.charAt(0).toLocaleUpperCase()}
          {username.substring(1)}
        </p>
      </div>
      <div>
        {userKeys &&
          userKeys.map((key: any) => (
            <p className="my-4 text-center " key={key.key}>
              {key.key}
            </p>
          ))}
      </div>
      <div className="flex flex-col justify-center items-center ">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
