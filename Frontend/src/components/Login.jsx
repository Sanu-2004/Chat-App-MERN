import { useState } from "react";
import { Link } from "react-router-dom";
import { Loginhook } from "../Hooks/Login.hook";

const Login = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const {loading, useLogin} = Loginhook();

  const handleSumit = (e) => {
    e.preventDefault();
    useLogin(details);
  };
  return (
    <>
      <div className="flex justify-center items-center p-9 min-h-screen">
        <div className="md:w-1/2 sm:w-full p-2 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-3xl p-2 underline">
              Log<span className="text-blue-800">In</span>
            </h1>
            <form
              className="form-control flex flex-col p-4 md:w-1/2 sm:w-full"
              onSubmit={handleSumit}
            >
              <label className="label">Email :</label>
              <input
                type="text"
                placeholder="example@email.com"
                value={details.email}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
              />
              <label className="label">Password :</label>
              <input
                type="password"
                placeholder="********"
                value={details.password}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
              />
              <span className="py-2">
                <Link
                  to="/signup"
                  className="hover:text-blue-800 hover:underline p-2"
                >
                  Don't have an Account
                </Link>
              </span>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-dots loading-md"></span> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
