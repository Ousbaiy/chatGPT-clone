import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BounceLoader } from "react-spinners";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const getAnswer = async () => {
      setLoading(true);
      let res = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
      res = await res.json();
      setAnswer((prev) => [...prev, res.answers]);
      setLoading(false)
    };
    question !== "" && getAnswer();
    setQuestion("");
  }, [question, answer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestion(inputRef.current.value);
    inputRef.current.value = "";
  };
  return (
    <div className="container">
      {loading ? (
        <div className="loader">
          {" "}
          <BounceLoader color="white" />
        </div>
      ) : null}
      <h1 className="h1">Chat Gpt</h1>
      <pre className="answer-area">{answer}</pre>
      <form onSubmit={handleSubmit} className="question-form">
        <input name="question" type="text" ref={inputRef} />
        <input type="submit" value="&#x3e;" />
      </form>
    </div>
  );
}
export default App;
