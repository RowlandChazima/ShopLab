import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

// Passing a children prop making this data accesible to all the pages

export default function AuthProvider({children}){
    const [user, setUser] =useState(
        localStorage.getItem("currentUserEmail")
        ?{ email: localStorage.getItem("currentUserEmail")}
        : null
    );

    // WHEN NEW USERS SIGN UP
function signUp(email,password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u) => u.email === email)) {
        return { success: false , error: "Email already exists"}
    }

    const newUser ={email, password}
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUserEmail", email)

    setUser({email})


return {success: true}
}

// FOR LOGINS ONLY
function login(email,password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(
        (u) => u.email === email && u.password ===password
    )

    if (!user) {
        return {sucess:false ,error:"Invalid email or password"}
    }

localStorage.setItem("currentUserEmail",email)
setUser({email})


return{sucess: true}
}

// FOR LOGOUT 
function logout() {
    localStorage.removeItem("currentUserEmaail")
    setUser(null)

}


return (
    <AuthContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

// Connecting all the pages to the wifi by calling these Functions

export function useAuth() {
    const context= useContext(AuthContext)

    return context
}




