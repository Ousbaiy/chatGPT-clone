import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");

  useEffect(() => {
    const getAnswer = async () => {
      let res = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
      res = await res.json();
      setAnswer(res.answers);
      setPrevAnswer((prev) => prev + answer);
    };
    question !== "" && getAnswer();
    setQuestion("");
  }, [question, answer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(e.target.elements.question.value);
  };
  return (
    <div className="container">
      <h1 className="h1">Chat Gpt</h1>
      <pre className="answer-area">
        {prevAnswer}
        <br />
        {answer}
      </pre>
      <form onSubmit={handleSubmit} className="question-form">
        <input name="question" type="text" />
        <input type="submit" value="Ask" />
      </form>
    </div>
  );
}

export default App;
