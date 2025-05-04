import { useContext } from "react";
import { AuthContext } from "../../context/context";
import { apiRequest } from "../../lib/apiRequst";
import {  useNavigate } from "react-router-dom";
function ProfilePage(){
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser
    const navigate = useNavigate()
    const handleClick =async()=>{
        const res = await apiRequest.post('/auth/logout')
        console.log(res)
        if(res.status===200||res.statusText==='OK'){
            localStorage.removeItem("user");
            navigate('/login')
            
        }
        

    }
    return(
        <div className="bg-blue-100 h-[100vh] flex flex-col gap-9">
            <h1 className="text-4xl pt-4 text-center w-[100%]">Dash board</h1>
            <div className="flex items-center justify-center">
                <img src="profile.png" alt="profile" className="w-[40%] rounded-full"/>
            </div>
            <div className="bg-cyan-800  pt-5 pb-5 ">

            <div className="flex flex-col gap-4 ml-6 ">
                <h2 className="text-2xl text-white"> Username: {currentUser?.username}</h2>
            
                <h2 className="text-2xl text-white"> Email: {currentUser?.email}</h2>
                <h2 className="text-2xl text-white"> Email: {currentUser?.created_at}</h2>
            </div>              

            </div>
            <div className="flex gap-10 justify-evenly">
              <button onClick={handleClick} className="bg-red-600 text-white h-[50px] w-[100px] rounded-2xl cursor-pointer">
                Logout
              </button>
              <button  className="bg-blue-600 text-white h-[50px] w-[100px] rounded-2xl cursor-pointer">
                update
              </button>
            </div>
        </div>
    );
}
export default ProfilePage;