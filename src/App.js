import React, { useState } from "react";
import './App.css'; // Importing CSS file for styling

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askGPT = async () => {
        setLoading(true);
        setAnswer(""); // Clear previous answer while loading
        try {
            const response = await fetch(`https://pegwendegpt-backend.onrender.com/workgpt?question=${encodeURIComponent(question)}`);
            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            setAnswer("Sorry Peg-AI is taking a break! Try again later.");
        }
        setLoading(false);
    };

    const handleFocus = () => {
        // Clear the input text when the user clicks into the search box
        if (question === "") return;
        setQuestion(""); 
    };

    return (
        <div className="workgpt-container">
            <header className="header">
                <h1>Peg-AI</h1>
                <p>Get any <b>Proffessional</b>-related questions answers instantly!</p>
            </header>
            <main className="main-content">
                <section className="input-container">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask Peg-AI..."
                        className="question-input"
                        onFocus={handleFocus}  // Clear input text on focus
                    />
                    <button onClick={askGPT} className="ask-button" disabled={loading}>
                        {loading ? "Thinking..." : "Ask"}
                    </button>
                </section>
                {loading && <p className="loading-text">Loading...</p>}
                {answer && (
                    <section className="answer-container">
                        <h3>Answer:</h3>
                        <p>{answer}</p>
                    </section>
                )}
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} || Created By: Pegwende P Zabsore </p>
                <nav className="footer-nav">
                    <a href="https://www.linkedin.com/in/pegwende-p-zabsore/" target="_blank" className="footer-link">LinkedIn</a>
                    <a href="#" target="_blank" className="footer-link">Instagram</a>
                    <a href="/contact" className="footer-link">Contact</a>
                </nav>
            </footer>
        </div>
    );
}

export default App;
