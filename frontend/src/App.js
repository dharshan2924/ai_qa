import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question) return;

    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setAnswer(data.answer || "No answer available.");
  };

  return (
    <div className="App">
      <h1>🤖 AI Question Answering System</h1>
      <form onSubmit={handleAsk}>
        <input
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button type="submit">Ask</button>
      </form>
      {answer && <div className="answer">{answer}</div>}
    </div>
  );
}

export default App;
