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
            const response = await fetch(`http://localhost:8081/peggpt?question=${encodeURIComponent(question)}`);
            const data = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            setAnswer("Failed to fetch answer. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="workgpt-container">
            <header className="header">
                <h1>Peg-AI</h1>
                <p>Get <b>Bible</b>-related answers instantly!</p>
            </header>
            <main className="main-content">
                <section className="evangelism-message">
                    <h2>Jesus Loves You!</h2>
                    <p>John 3:16</p>
                </section>
                <section className="input-container">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask Peg-AI..."
                        className="question-input"
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
                <p>Acknowlegment: Rafi Zabsore</p>
                <nav className="footer-nav">
                    <a href="https://www.facebook.com/aristide.zabsore" target="_blank" className="footer-link">Facebook</a>
                    <a href="#" target="_blank" className="footer-link">Instagram</a>
                    <a href="/contact" className="footer-link">Contact</a>
                </nav>
            </footer>
        </div>
    );
}

export default App;
