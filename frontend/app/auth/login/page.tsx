"use client";

import { useState } from "react";
import publicApi from "@/utils/publicApi";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await publicApi.post("/api/auth/login", {
        userEmail: userEmail,
        userPassword: userPassword,
      });

      const { accessToken, message } = res.data;

      if (!accessToken) throw new Error("No access token returned");


      localStorage.setItem("accessToken", accessToken);
      setMessage(message ?? "Login successful");
      if(res.status == 200){
        setTimeout(()=>{
          router.push("/notes")
        })
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
          Welcome back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
           className="w-full rounded-lg border border-zinc-300 px-4 py-2 
text-zinc-900 placeholder-zinc-400 
focus:outline-none focus:ring-2 focus:ring-black bg-white"

          />

          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 
text-zinc-900 placeholder-zinc-400 
focus:outline-none focus:ring-2 focus:ring-black bg-white"

          />

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-zinc-800 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-zinc-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
