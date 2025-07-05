import React, { useState } from "react";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { text: "Hi! Ask me anything about astronomy or space history.", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful astronomy expert who answers questions about space events, celestial phenomena, and space missions in simple and friendly language." },
                        { role: "user", content: input },
                    ],
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const reply = data.choices[0].message.content;
                setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
            } else {
                setMessages((prev) => [...prev, { text: `Error: ${data.error.message}`, sender: "bot" }]);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Error connecting to OpenAI API.", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className="bg-slate-900 text-white p-6 min-h-screen pt-24">
            <h1 className="text-3xl font-bold mb-4 text-indigo-400">🌌 Astro Chatbot</h1>
            <div className="bg-slate-800 rounded-lg p-4 h-[60vh] overflow-y-auto mb-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-lg ${
                            msg.sender === "user"
                                ? "bg-indigo-600 ml-auto text-right"
                                : "bg-slate-700 mr-auto"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <div className="text-slate-400 italic">Thinking...</div>
                )}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about a space event..."
                    className="flex-1 p-3 rounded-l-lg bg-slate-700 text-white focus:outline-none"
                />
                <button
      npm run build
              onClick={sendMessage}
                    className="bg-indigo-600 hover:bg-indigo-500 px-6 rounded-r-lg text-white"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
