"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <br />
        <button className="lg:p-0 sm:p-5 bg-primary" onClick={toggleTheme}>
          Toggle Themes
        </button>
      </div>
    </main>
  );
}
