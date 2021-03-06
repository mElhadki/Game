import '../styles/Game.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function Game() {
  let history = useHistory();
  useEffect(() => {
    var urlString = window.location.search;
    var urlParam = new URLSearchParams(urlString);
    var auth = urlParam.get('auth');
    if (auth === 'true') {
      toast.error("you are already logged in!", {
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
      if (res.data.auth === false) {
        history.push('/Auth?auth=false')
      }
    })
  })


  function createGroup() {

    history.push("/Loading?createGame=true");
  }

  function joinGroup() {
    let swalForm = {
      title: 'Join a group?',
      focusConfirm: false,
      html: `
      <input class="swal2-input" id="code" type="text" placeholder="Enter code group..." />
    `,
      type: 'info',
      showCancelButton: true,
      cancelButtonColor: 'grey',
      confirmButtonText: 'Join now!',
      allowOutsideClick: false,
      preConfirm: async () => {
        await axios.get("http://localhost:8080/game/joinGroup/" + document.getElementById('code').value, {
          headers: {
            'x-access-token': localStorage.getItem("x-access-token")
          }
        }).then((res) => {
          console.log(res);
          if (res.data.error === undefined) {
              history.push("/Loading?join=" + document.getElementById('code').value)
          }
          else {
            MySwal.fire('<p style="color:red; animation: none !important;opacity: 1 !important;">' + res.data.error + '</p>')
            return;
          }
        })
      }
    };
    const MySwal = withReactContent(Swal)

    MySwal.fire(swalForm)
  }




  return (
    <div>
      <ToastContainer />
      <div className="outer">
        <div className="prod-logo">
        </div>
        <div className="inner">
          <div className="prod-left">
            <h1 className="prod-head"><span>Hello</span> guest</h1>
            <h4 className="prod-head-sub">Choice and play now ...</h4>
            <div>
              <button onClick={createGroup} >Create Group</button>
              <button onClick={joinGroup}>Join Group</button>
            </div>
          </div>
          <div className="prod-right">
            <img src="https://i.postimg.cc/SKkBJwRX/Gaming-bro.png" width="300px" height="300px" className="prod-human-img" alt="prod" />
          </div>
        </div>
      </div>
    </div>


  )
}
export default Game;