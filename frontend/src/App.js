// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to Socket.IO server

function App() {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Listen for new messages from the server
    socket.on('message', (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const joinGroup = () => {
    if (name && groupId) {
      socket.emit('joinGroup', { name, groupId });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message && groupId) {
      socket.emit('sendMessage', { name, message, groupId });
      setMessage(''); // Clear input field after sending
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!joined ? (
        <div>
          <h2>Join Chat Group</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Group ID"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button onClick={joinGroup}>Join Group</button>
        </div>
      ) : (
        <div>
          <h2>Group ID: {groupId}</h2>
          <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
            {chatMessages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
