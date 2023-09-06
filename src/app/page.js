'use client'

import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [userName, setUserName] = useState();
  const [password, setpassword] = useState();
  const [error, setError] = useState("");

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false
    })
      .then(({ ok, error }) => {
        if (error === null) {
          // window.location.replace("/HomePage");
          router.push("/HomePage");
        } else {
          console.log(error, "ok")
        }
      })
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
          <div className="mb-4">
            <label
              htmlFor="UserName"
              className="block text-sm font-semibold text-gray-800"
            >
              UserName
            </label>
            <input
              onChange={(e) => (setUserName(e.target.value))}
              type="UserName"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) => (setpassword(e.target.value))}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button onClick={onSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
