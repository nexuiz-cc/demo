import Login from "../pages/login/Login";
import ToggleColorMode from "../App";
function RouterBefore(){
 console.log(localStorage.getItem("userToken"));
    if (localStorage.getItem("userToken")==="logout") {
      return (
       <Login/>
      );
    }else{
      return <ToggleColorMode></ToggleColorMode>;
    } 
}
export default RouterBefore;
