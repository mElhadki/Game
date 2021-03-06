import '../styles/Quiz.css'
import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ReactDOM from "react-dom";



function Quiz() {
  const[questionsIndex, setQuestionIndex] = useState(1);
  let history = useHistory();
  let redirect;

 


  useEffect(() => {
    if(questionsIndex > 15){
      history.push("/score")
    }
    var interval = setInterval(() => {
      axios.get("http://localhost:8080/game/sessionUser", { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }).then( (response) => {


        axios.get(`http://localhost:8080/game/${response.data.idRound}&q${questionsIndex}`, {
          headers: {
            'x-access-token': localStorage.getItem("x-access-token")
          }
        }).then((response) => {
          console.log(response);
          if (response.data.expired == true) {
             setQuestionIndex(questionsIndex + 1);
          }
          
        })
      })
    }, 9000);
    var questionPush = document.getElementById('questionPush')
    var answer1 = document.getElementById('answer1');
    var answer2 = document.getElementById('answer2');
    var answer3 = document.getElementById('answer3');
    var answer4 = document.getElementById('answer4');
    var score = document.getElementById('score');

    axios.get("http://localhost:8080/game/sessionUser", { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }).then((response) => {


      axios.get(`http://localhost:8080/game/${response.data.idRound}&q${questionsIndex}`, {
        headers: {
          'x-access-token': localStorage.getItem("x-access-token")
        }
      }).then((response) => {

        if (response.data.error !== undefined) {
          history.push("/Game");
        }
        else {
          questionPush.innerHTML = response.data.question;
          answer1.value = response.data.first_answer;
          answer2.value = response.data.second_answer;
          answer3.value = response.data.third_answer;
          answer4.value = response.data.fourth_answer;
          answer1.innerHTML = response.data.first_answer;
          answer2.innerHTML = response.data.second_answer;
          answer3.innerHTML = response.data.third_answer;
          answer4.innerHTML = response.data.fourth_answer;
          score.innerHTML = 'Your score : ' + response.data.votre_Score
        }

      })
    }) 
    return () => clearInterval(interval)
  }, [questionsIndex]);

  function postAnswer(e) {
    var answer = e.target.value
    console.log(answer);
    axios.get("http://localhost:8080/game/sessionUser", { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }).then(async (response) => {

      var data = {
        answer : answer
      }

      axios.post(`http://localhost:8080/game/${response.data.idRound}&q${questionsIndex}`, data, {
        headers: {
          'x-access-token': localStorage.getItem("x-access-token")
        }
      }).then((response) => {
        console.log(response);
        
      })
    })
  }




  return (


    <div className="outer">
  
      <div className="prod-logo">
      </div>
      <div className="inner">
        <div className="prod-left">
          <h1 className="prod-headW"><span>Game</span> Started</h1>
          <div id="quizzie">
            <ul className="quiz-step step1 current">

              <li className="question">
                <div className="question-wrap">
                  <h2 id="questionPush" ></h2>
                </div>
              </li>
              <div>
                <li className="quiz-answer low-value" >
                  <div className="answer-wrap">
                    <input id="answer1" type="button" onClick={(e) => postAnswer(e)}   className="answer-text"></input>
                  </div>
                </li>
                <li className="quiz-answer low-value" >
                  <div className="answer-wrap">
                    <input id="answer2" type="button"  onClick={(e) => postAnswer(e)}   className="answer-text"></input>
                  </div>
                </li>
              </div>
              <div>
                <li className="quiz-answer low-value" >
                  <div className="answer-wrap">
                    <input id="answer3" type="button"  onClick={(e) => postAnswer(e)}   className="answer-text"></input>
                  </div>
                </li>

                <li className="quiz-answer high-value" >
                  <div className="answer-wrap">
                    <input id="answer4" type="button"   onClick={(e) => postAnswer(e)}  className="answer-text"></input>
                  </div>
                </li>
              </div>
            </ul>

          </div>
          <div>
          </div>
        </div>
        <div className="prod-right">
          <h2 id="score"></h2>
          <img src="https://i.postimg.cc/SKkBJwRX/Gaming-bro.png" width="300px" height="300px" className="prod-human-img" alt="prod" />
        </div>
      </div>
    </div>
  )
}
export default Quiz;