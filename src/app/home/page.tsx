"use client";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import axios from "axios";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [userKeys, setUserKeys] = useState([]);
  const logout = async () => {
    try {
      await axios.post("/api/user/logout");
      router.refresh();
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/user/getProfile");
      setUsername(res.data.user.username);
      setUserKeys(res.data.userData);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const getDetails = (key: string) => {
    const newKeys: any = userKeys.map((k: any) => {
      if (k.key === key) {
        return { ...k, showDetails: true };
      } else {
        return { ...k, showDetails: false };
      }
    });
    setUserKeys(newKeys);
  };
  if (username === "") return <></>;
  return (
    <div className="h-screen">
      <Topbar />
      <div>
        <p className="text-center ml-auto mr-auto justify-center text-2xl mt-1 tracking-wide pr-6">
          Hello {username.charAt(0).toUpperCase()}
          {username.substring(1)}
        </p>
      </div>
      <div className="flex flex-row w-full flex-wrap mt-6 mb-2">
        {userKeys.map((key: any) => (
          <div
            className="text-center my-3 lg:w-1/4 md:w-1/3 w-1/2"
            style={{ height: "15svh" }}
            key={key.key}
            onClick={() => {
              getDetails(key.key);
            }}
          >
            <div className={`card ${key.showDetails ? "flipped" : ""}`}>
              <div className="card-inner mx-auto">
                <div className=" bg-card card-front w-11/12 mx-auto h-full rounded-xl flex justify-center items-center">
                  <div>
                    <p className="">{key.key}</p>
                  </div>
                </div>
                <div className=" bg-card card-back w-11/12 mx-auto h-full rounded-xl flex justify-center items-center">
                  <div>
                    <p className="">Username</p>
                    <p className="">Password</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
