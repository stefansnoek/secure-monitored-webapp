import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = '/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/getMessages`);
      setMessages(res.data);
    } catch {
      setStatus('Error fetching data');
    }
  };

  const submitMessage = async () => {
    try {
      await axios.post(`${API_BASE}/addMessage`, { text: input });
      setInput('');
      setStatus('✅ Bericht verstuurd!');
      fetchMessages();
    } catch (error) {
      console.error('❌ API error:', error.response?.data || error.message);
      setStatus(`❌ Fout: ${error.response?.data || 'Onbekende fout'}`);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2> Azure Webapp Demo</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={submitMessage}>Send</button>
      <p>{status}</p>
      <h4> Messages:</h4>
      <ul>{messages.map((m) => <li key={m.id}>{m.text}</li>)}</ul>
    </div>
  );
}

export default App;
