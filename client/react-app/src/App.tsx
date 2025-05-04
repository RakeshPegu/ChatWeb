import {createBrowserRouter, RouterProvider}from 'react-router-dom'
import Register from './routes/register';
import FillOtp from './routes/Fill_otp';
import Home from './routes/Home';
import Login from './routes/Login';

import { ChatLoaders, messageLoader, ProfilesLoader, singleProfileLoader } from './lib/loader';
import SinglePage from './components/SingleProfile/SinglePage';
import UserProfile from './routes/UserProfile/UserProfiles';
import MessagePage from './routes/MessagePage/SingleChat';
import Chats from './routes/chats/chats';
import { ChatLayout, Layout, MessageLayout } from './routes/Layout/Layout';
import ProfilePage from './routes/ProfilePage/ProfilePage';
const routes = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  
  },
 
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/otp_verification",
    element:<FillOtp/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<Layout/>,
    children: [
     
      {
        path:"profiles",
        element:<UserProfile/>,
        loader:ProfilesLoader
      }, 
      {
        path:'profile_of/:userId',
        element:<SinglePage/>,
        loader:singleProfileLoader
       
         
      },
     
     
    
    ]
  },
  {
    path:'/',
    element:<ChatLayout/>,
        children:[
      {
        path:"chats",
        element:<Chats/>,
        loader:ChatLoaders
        
      },
      
      
    ]
  },
  {
    path:"/",
    element:<MessageLayout/>,
    children: [
      {
        path:'profile',
        element:<ProfilePage/>
      },
      {
          path:"/chats/:chatId",
          element:<MessagePage/>,
          loader:messageLoader
        
      }
    ]
  }
])
function App(){
  return (
    <RouterProvider router={routes}/>
  );
}
export default App;