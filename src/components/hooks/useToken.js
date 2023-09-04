import { useEffect, useState } from "react"

const useToken =user =>{
    const [token,setToken]= useState('')
    useEffect(() =>{
        const email = user?.user?.email;
        const currentUser = {email: email};
        if(email){
            console.log(email,"user")
            if(email){
                fetch(`https://zante-hotel-booking-app-server-devpronob.vercel.app/api/user`, {
                    method:'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body:JSON.stringify(currentUser)
                })
                .then(res=>res.json())
                .then(data => {
                    console.log('data inside useToken', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
            }
    
        }
    },[user])
    return [token]
}
export default useToken;