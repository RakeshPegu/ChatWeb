import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="flex h-[100vh] justify-center text-[2em] items-center gap-20 bg-green-500 flex-col">
            <h1 className="font-serif"> Conect with your friends</h1>
           <Link to={'/register'}><button className="bg-cyan-400 hover:bg-blue-200 h-[50px] w-[150px] rounded-2xl cursor-pointer"> Start </button></Link>
        </div>
    );
}
export default Home;