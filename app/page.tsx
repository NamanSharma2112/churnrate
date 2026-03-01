import Image from "next/image";
import { Inter } from "next/font/google";
import Dasboard from "../compoents/dasboard/Dasboard";
import Sidebar from "../compoents/sidebar/Sidebar";
export default function Home() {
  return (
    <div className="grid gap-4 p-4 grid-cols-[220px_1fr]">
    <Sidebar />
     <Dasboard />
    </div>
  );
}
