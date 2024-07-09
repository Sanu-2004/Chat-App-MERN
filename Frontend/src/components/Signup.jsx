import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Signuphook } from "../Hooks/Signup.hook";

const Signup = () => {
  const {loading, useSignup} = Signuphook();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    useSignup(details);
  };
  return (
    <>
      <div className="flex justify-center items-center p-9 ">
        <div className="md:w-1/2 sm:w-full p-2 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-3xl p-2 underline">
              Sign<span className="text-blue-800">Up</span>
            </h1>
            <form
              className="form-control flex flex-col p-4 md:w-1/2 sm:w-full"
              onSubmit={handleSubmit}
            >
              <label className="label">Name :</label>
              <input
                type="text"
                placeholder="john doe"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">Email :</label>
              <input
                type="text"
                placeholder="example@email.com"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">Password :</label>
              <input
                type="password"
                placeholder="********"
                value={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">Confirm Password :</label>
              <input
                type="password"
                placeholder="********"
                value={details.confirmPassword}
                onChange={(e) =>
                  setDetails({ ...details, confirmPassword: e.target.value })
                }
                className="input input-bordered w-full max-w-xs"
              />
              <span className="py-2">
                <Link
                  to="/login"
                  className="hover:text-blue-800 hover:underline p-2"
                >
                  Already have an Account
                </Link>
              </span>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading? <span className="loading loading-dots loading-md"></span> :'Signup'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
