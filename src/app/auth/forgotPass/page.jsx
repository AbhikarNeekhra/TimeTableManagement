"use client";
import axios from "axios";
import { useSession } from "next-auth/react";

import Forg from "./forg";

import { useState } from "react";


const ForgotPass = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [newPassword, setNewPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const minPasswordLength = 8;

  const handleChange = (e) => {
    setNewPassword(e.target.value);
    // Check if passwords match after each change
    setPasswordMatch(
      e.target.value === CPassword && e.target.value.length >= minPasswordLength
    );
  };

  const handleMatch = (e) => {
    setCPassword(e.target.value);
    // Check if passwords match after each change
    setPasswordMatch(
      e.target.value === newPassword &&
        e.target.value.length >= minPasswordLength
    );
  };

  const changePassword = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      setLoading(true);
      const response = await axios.put("/api/change-password", {
        email,
        newPassword,
      });
      if (response.ok) {
        console.log("Password Changed");
      }
    } catch (error) {
      console.log("Password Change Failed", error);
    } finally {
      setLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <>
      <Forg />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Forgot Password</h1>
        <form onSubmit={changePassword} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="new-password" className="mb-2 text-sm font-medium">
              New Password
            </label>
            <input
              id="new-password"
              required
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              value={newPassword}
              autoComplete="new-password"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="mb-2 text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              required
              type="password"
              placeholder="Confirm Password"
              onChange={handleMatch}
              value={CPassword}
              autoComplete="new-password"
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          {(!newPassword || !CPassword) && (
            <p className="text-red-500 text-sm">Passwords required!</p>
          )}
          {newPassword.length < minPasswordLength && (
            <p className="text-red-500 text-sm">
              Passwords should be greater than 8 characters
            </p>
          )}
          {!passwordMatch && newPassword !== "" && CPassword !== "" && (
            <p className="text-red-500 text-sm">Passwords do not match!</p>
          )}
          {passwordMatch && newPassword !== "" && CPassword !== "" && (
            <p className="text-green-500 text-sm">Passwords match!</p>
          )}
          <button
            type="submit"
            disabled={loading || !passwordMatch}
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Forgot Password</h1>
      <form onSubmit={changePassword} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="new-password" className="mb-2 text-sm font-medium">
            New Password
          </label>
          <input
            id="new-password"
            required
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            value={newPassword}
            autoComplete="new-password"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="confirm-password"
            className="mb-2 text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            required
            type="password"
            placeholder="Confirm Password"
            onChange={handleMatch}
            value={CPassword}
            autoComplete="new-password"
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {(!newPassword || !CPassword) && (
          <p className="text-red-500 text-sm">Passwords required!</p>
        )}
        {newPassword.length < minPasswordLength && (
          <p className="text-red-500 text-sm">
            Passwords should be greater than 8 characters
          </p>
        )}
        {!passwordMatch && newPassword !== "" && CPassword !== "" && (
          <p className="text-red-500 text-sm">Passwords do not match!</p>
        )}
        {passwordMatch && newPassword !== "" && CPassword !== "" && (
          <p className="text-green-500 text-sm">Passwords match!</p>
        )}
        <button
          type="submit"
          disabled={loading || !passwordMatch}
          className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>

  );
};

export default ForgotPass;
