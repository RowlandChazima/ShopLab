import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authcontext"
import { useForm } from "react-hook-form"



export default function  Auth(){
const[mode,setMode] = useState("signup")
const [error,setError] = useState(null)

const navigate = useNavigate()

const {signUp,login} = useAuth()

const {
    register,
    handleSubmit,
    formState:{errors}

} =useForm()

function onSubmit(data) {
setError(null)
let result;
if (mode === "signup"){
    result = signUp(data.email, data.password);
} else {
    result = login(data.email, data.password);
}

if (result.success) {
    navigate("/")
} else {
    setError(result.error)
}


}

return (
<div className="min-h-screen bg-[#FF6B9D] flex items-center justify-center font-sans p-4">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 md:p-12 relative overflow-hidden">
        
        {/* Header / Logo Bar */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
            {/* Minimalist News Logo */}
            <svg className="w-6 h-6 text-[#FF6B9D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Sports<span className="text-[#FF6B9D]">news</span></span>
          </div>
          
          <button 
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            className="text-sm font-semibold text-slate-600 hover:text-[#FF6B9D] transition-colors"
          >
            {mode === "signup" ? "Login" : "Signup"}
          </button>
        </div>

        {/* Form Body Wrap */}
        <div className="max-w-md mx-auto">
          
          {/* Avatar Illustration Placeholder */}
          <div className="flex justify-start mb-6">
            <div className="relative bg-slate-50 border border-slate-100 rounded-full p-4">
              <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <div className="absolute -right-1 bottom-2 bg-[#FF6B9D] text-white p-1 rounded-md text-[10px]">
                📱
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
            {mode === "signup" ? "Welcome, Create your account" : "Welcome back!"}
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            {mode === "signup" ? "Enter your email and create a password" : "Sign in to access your tailored dashboard"}
          </p>

          {/* Error Message banner */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Core Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Multi-input row for Name (Signup mode only) */}
            {mode === "signup" && (
              <div className="flex gap-3">
                <div className="w-1/4 relative">
                  <select className="w-full h-12 px-3 bg-white border border-rose-200 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] appearance-none cursor-pointer">
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                  <div className="absolute right-3 top-4 pointer-events-none text-rose-400 text-xs">▼</div>
                </div>
                <div className="w-3/4">
                  <input
                    className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] transition-all"
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: mode === "signup" ? "Name is required" : false })}
                  />
                  {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
                </div>
              </div>
            )}

            {/* Email and Password row split similar to design UI format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] transition-all"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <input
                  className="w-full h-12 px-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D] transition-all"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                    maxLength: { value: 12, message: "Max 12 characters" },
                  })}
                />
                {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#FF6B9D] text-white font-medium rounded-lg text-sm shadow-md hover:bg-[#e05688] hover:shadow-lg active:scale-[0.98] transition-all"
              >
                Continue
              </button>
            </div>
          </form>

          {/* Auth Switcher Footer */}
          <div className="mt-8 text-center text-sm text-slate-400">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <button type="button" className="text-[#FF6B9D] font-semibold hover:underline" onClick={() => setMode("login")}>
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button type="button" className="text-[#FF6B9D] font-semibold hover:underline" onClick={() => setMode("signup")}>
                  Sign Up
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
)
  

}