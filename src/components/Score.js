import axios from 'axios';
import { useEffect } from 'react';
import '../styles/Score.css'
import win from '../styles/win.gif'
function Score() {
  useEffect(() => {
    axios.get("http://localhost:8080/game/sessionUser", { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }).then( (response1) => {


      axios.get(`http://localhost:8080/game/result/${response1.data.idRound}`, {
        headers: {
          'x-access-token': localStorage.getItem("x-access-token")
        }
      }).then((response) => {
        console.log(response);
        var nameWinner = document.getElementById('nameWinner');
        var yourScore = document.getElementById('yourScore');
        var scoreWinner = document.getElementById('scoreWinner');
        var gift = document.getElementById('gift');
        nameWinner.innerHTML = response.data.scoreBoard.winner;
        yourScore.innerHTML = response.data.scoreBoard.your_score;
        scoreWinner.innerHTML = response.data.scoreBoard.score_Winner;
        gift.innerHTML = response.data.scoreBoard.your_gift;
        if(response.data.scoreBoard.are_you_winner == false){
          document.getElementById('winGif').style.display = 'none'
        }
        axios.get(`http://localhost:8080/game/exitGame/${response1.data.idGroup}`, {
          headers: {
            'x-access-token': localStorage.getItem("x-access-token")
          }
        })
      })
    })
    }, [])
  return (
    <div className="outer">
      <div className="prod-logo">
      </div>
      <div className="inner">
        <div className="prod-left">
          <h1 className="prod-head"><span>Who is</span> The winner</h1>
          <h4 className="prod-head-sub">Players Statistic ...</h4>
          <div>
            <div className="courses-container">
              <div className="course">
                <div className="course-preview">
                  <h6>Winner</h6>
                  <h2 id="nameWinner"></h2>
                </div>
                <div className="course-info">
                  <h6>Your Score</h6>
                  <h2 id="yourScore"></h2>
                  <h6>Score Winner</h6>
                  <h2 id="scoreWinner"></h2>
                  <h6 >Your Gift</h6>
                  <h2 id="gift"></h2>
                  <br />
                  <button className="btnExit">Exit</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="prod-right">
          <img src="https://i.postimg.cc/85j7HkGJ/Winners-rafiki-1.png" width="300px" height="300px" className="prod-human-img" alt="prod" />
        </div>
        <img className="win" id="winGif" src={win} />
      </div>
    </div>

  )
}
export default Score;