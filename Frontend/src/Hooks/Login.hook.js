import { useState } from "react"
import { toast } from "react-hot-toast"
import { useUsercontext } from "../Context/UserContext"

export const Loginhook = () => {
    const [loading, setLoading] = useState(false)
    const {setUser}=useUsercontext()

    const useLogin = async ({email, password}) =>{
        setLoading(true)
        try {
            if(!email || !password){
                toast.error("Please fill all the fields")
                return
            }
            const response = await fetch('http://localhost:5000/api/auth/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email, password
                })
            })
            const data = await response.json()
            console.log(data)
            if(data.message){
                toast.error(data.message)
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
    return {loading, useLogin}
}