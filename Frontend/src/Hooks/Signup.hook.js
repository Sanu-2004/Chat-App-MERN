import { useState } from "react"
import { toast } from "react-hot-toast"
import { useUsercontext } from "../Context/UserContext"

export const Signuphook = () => {
    const [loading, setLoading] = useState(false)
    const {setUser}=useUsercontext()

    const useSignup = async (user) =>{
        setLoading(true)
        try {
            if(!user.name || !user.email || !user.password || !user.confirmPassword){
                toast.error("Please fill all the fields")
                return
            }
            if(user.password.length < 6){
                toast.error("Password should be atleast 6 characters long")
                return
            }
            if (user.password !== user.confirmPassword){
                toast.error("Password and Confirm Password do not match")
                return
            }
            const response = await fetch('http://localhost:5000/api/auth/signup',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    confirmPassword: user.confirmPassword,
                    gender: user.gender
                })
            })
            const data = await response.json()
            if(data.message){
                toast.error(data.message)
                return
            }
            localStorage.setItem('chat', JSON.stringify(data))
            setUser(data)
            
        } catch (error) {
            console.log(error)
            toast.error(error)
        }finally{
            setLoading(false)
        }
    }
    return {loading, useSignup}
}