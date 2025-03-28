import React, { useState } from "react";
import './App.css'; // Importing CSS file for styling

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const askGPT = async () => {
        const response = await fetch(`https://pegwendegpt-backend.onrender.com/workgpt?question=${encodeURIComponent(question)}`);
        const data = await response.json();
        setAnswer(data.answer);
    };

    return (
        <div className="workgpt-container">
            <div className="header">
                <h1>Welcome to Pegwende & Rafi GPT</h1>
                <p>Get quick answers for any-related questions!</p>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask Pegwende GPT..."
                    className="question-input"
                />
                <button onClick={askGPT} className="ask-button">Ask</button>
            </div>
            {answer && (
                <div className="answer-container">
                    <h3 className="answer-title">Answer:</h3>
                    <p className="answer-text">{answer}</p>
                </div>
            )}
        </div>
    );
}

export default App;
