import Login from "../pages/login/Login";
import Layout from "../pages/layout/Layout";
function RouterBefore(){
 console.log(localStorage.getItem("userToken"));
    if (localStorage.getItem("userToken")==="logout") {
      return (
       <Login/>
      );
    }else{
      return <Layout></Layout>;
    } 
}
export default RouterBefore;
