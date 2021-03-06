import '../styles/Loading.css'
import axios from "axios";
import { FaCopy } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Loading() {
  let history = useHistory();
  let myInput;
  
  useEffect(() => {
 
    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var createGame = urlParam.get('createGame');
    var joinGame = urlParam.get('join');
    var clear;
    var interval;
    if(createGame === 'true'){
      axios.get("http://localhost:8080/game/createGroup", {
        headers: {
          'x-access-token': localStorage.getItem("x-access-token")
        }
      }).then(async (res) => {
        
           if(res.data.error === undefined){
             myInput.value = res.data.code;
         interval =  setInterval(() => {
              axios.get("http://localhost:8080/game/sessionGroup/"+res.data.code, {
                headers: {
                  'x-access-token': localStorage.getItem("x-access-token")
                }
              }).then((response) => {
                if(response.data !== null){
                  console.log(response.data);
                  if(response.data.isFull == true ){
                    clearInterval(this);
                    
                    history.push('/round?q=1');
                    return clear = true;
                  }
                }
             
              })
             
            }, 2000);
           }
           else{
            await axios.get("http://localhost:8080/game/sessionUser", {
              headers: {
                'x-access-token': localStorage.getItem("x-access-token")
              }
            }).then((response) => {
               console.log(response);
              myInput.value = response.data.code;
              interval =   setInterval(() => {
                axios.get("http://localhost:8080/game/sessionGroup/"+response.data.code, {
                  headers: {
                    'x-access-token': localStorage.getItem("x-access-token")
                  }
                }).then((response) => {
                  if(response.data !== null){
                    console.log(response.data);
                    if(response.data.isFull == true ){
                      clearInterval(this);
                      history.push('/round?q=1');
                    return clear = true;
                      
                    }
                  }
               
                })
               
              }, 2000);
             })
           }
           
        })
    }  
    
  else if(joinGame !== ''){
        toast.success("welcome to our round !")
        myInput.value = joinGame;

 
    interval =    setInterval(() => {
          axios.get("http://localhost:8080/game/sessionGroup/"+joinGame, {
            headers: {
              'x-access-token': localStorage.getItem("x-access-token")
            }
          }).then((response) => {
            if(response.data !== null){
              console.log(response.data);
              if(response.data.isFull == true ){
                clearInterval(this);
                history.push('/round');
                return clear = true;
                
              }
            }
         
          })
        
        }, 2000);
    }
    else{
      history.push('/Game?error=true');
    }
   
    return () => {
      if(clear == true){
        clearInterval(interval);
      }
    }
  }, [])

  const copyToClipboard = () => {
    myInput.select();
    document.execCommand("copy");
    toast.success('Copied ' + myInput.value + ' !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  
  return (

    <div>
    
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="outer">
        <div className="prod-logo">
        </div>
        <div className="inner">
          <div className="prod-left">
            <input className="prod-head2"  id="codeGroup" readOnly value=""  onClick={copyToClipboard} ref={(ref) => myInput = ref}></input><FaCopy className="icon" />
            <h4 className="prod-head-sub2">Share the code and wait until All the players come in...</h4>
            <div className="loader"></div>
          </div>
          <div className="prod-right">
            <img src="https://i.postimg.cc/9fxD5HRt/Loading-rafiki.png" width="300px" height="300px" className="prod-human-img" alt="prod" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Loading;