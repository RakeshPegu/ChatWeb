import { useLoaderData } from "react-router-dom";
import Card from "../../components/card";


type UserInfo = {
  userId: number;
  email:string;
  username: string; 
  createdAt:Date
}

function UserProfile() {
  const userInfos = useLoaderData() as UserInfo[]; 
 
  return (
    <div >
      <ul className="flex gap-1 flex-col mt-5 " >
        {userInfos.map((userInfo) => (
          <li key={userInfo.userId} >
            <Card item={userInfo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;