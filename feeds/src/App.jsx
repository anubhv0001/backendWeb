import { useEffect,useState } from "react";

export default function App(){
const [posts,setPosts]=useState([]);
const [user,setUser]=useState({});
const [loading,setLoading]=useState(true);
const [error,setError]=useState(false);

useEffect(()=>{
async function fetchData(){
  try{
    const postsRes = await fetch("https://jsonplaceholder.typicode.com/posts")
      const postsData = await postsRes.json();
      const userRes=await fetch("https://jsonplaceholder.typicode.com/users/")
      const userData=await userRes.json();

      const userMap={};
      userData.forEach((u)=>(userMap[u.id]=u.username))

      setUser(userMap);
      setPosts(postsData);

  }
  catch(err){
    setError(true);
  }
  finally{
    setLoading(false);
  }

}


fetchData()},[]);

if (loading)return <h2>Loading......</h2>
if (error)return <h2>Something went wrong</h2>

return (
  <div className="container">

    {posts.map((post)=>(
      <postCard
      
    ))}
  </div>
)

}