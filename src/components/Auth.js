import axios from "axios";
import '../styles/App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Auth() {
  let history = useHistory();
  useEffect(() => {
    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var auth = urlParam.get('auth');
    if(auth === 'false'){
      toast.error("tu n'est pas authorizer !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    }
   
       axios.get("http://localhost:8080/token/check", {
       headers: {
         'x-access-token': localStorage.getItem("x-access-token")
       }
     }).then((res) => {
         if(res.data.auth === true){
             history.push('/Game?auth=true');
         }
       })
  })

  function signUp(){
    const container = document.querySelector(".container");
    container.classList.add("sign-up-mode");
  }    

  function signIn() {
    const container = document.querySelector(".container");
    container.classList.remove("sign-up-mode");
  }
 
  function login(){
    var phone = document.getElementById("phoneLogin").value;
    var password = document.getElementById("passwordLogin").value;
    var data = {
        phone : phone,
        password : password
    };
   
    console.log(data);
    axios.post("http://localhost:8080/participant/login", data).then((res) => {
      
       if(res.data.error !== undefined){
        res.data.error.forEach(element => {
          toast.error(element);
        });
       }
       else{
        localStorage.setItem('x-access-token', res.data.token);
        toast.success("login successful", { autoClose : 2000})
        setTimeout(() => history.push("/Game"), 2000)
       }
    })
  }

  function register() {
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var fullname = document.getElementById('fullname').value;

    var data = {
      phone : phone,
      password : password,
      username : username,
      email : email,
      fullname : fullname
    }
    axios.post("http://localhost:8080/participant/register", data).then((res) => {
      if(res.data.error !== undefined){ 
        res.data.error.forEach(element => {
          toast.error(element);
        });
      }
      else{
        toast.success(res.data.notification, {
          autoClose : 6000
        });
        document.getElementById('phone').value = '';
        document.getElementById('password').value = '';
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('fullname').value = '';
      }
    })
  }

  return (
    <div className="container">
    <ToastContainer />
    <div className="forms-container">
      <div className="signin-signup">
        <form action="#" className="sign-in-form">
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" id="phoneLogin" placeholder="Phone" required />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" id="passwordLogin" placeholder="Password" required />
          </div>
          <input type="button" onClick={login} value="Login" className="btn solid" />
        </form>
        <form action="#" className="sign-up-form">
          <h2 className="title">Sign up</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" id="fullname" placeholder="fullname" required />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="text" id="phone" placeholder="phone" required />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="text" id="username" placeholder="username" required />
          </div>
          <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="email" required />
          </div>
          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Password"required />
          </div>
          <input type="button" onClick={register} className="btn" value="Sign up" />
        </form>
      </div>
    </div>

    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>New here </h3>
          <p>
           You are welcome in who will win the million, 
           You are new Sign Up now and Play with your friends!
          </p>
          <button className="btn transparent" onClick={signUp} id="sign-up-btn">
            Sign up
          </button>
        </div>
        <img src="https://i.postimg.cc/BvG6ntsw/Customer-Survey-pana.png" className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <h3>One of us ?</h3>
          <p>
            You are welcome in who will win the million, 
            Login Now and Play.
          </p>
          <button className="btn transparent" onClick={signIn} id="sign-in-btn">
            Sign in
          </button>
        </div>
        <img src="https://i.postimg.cc/BvG6ntsw/Customer-Survey-pana.png" className="image" alt="" />
      </div>
    </div>
  </div>
  
  );
  



}



export default Auth;
