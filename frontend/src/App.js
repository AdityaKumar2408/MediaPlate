// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// const socket = io('https://mediaplate.onrender.com');

// function App() {
//   const [name, setName] = useState('');
//   const [groupId, setGroupId] = useState('');
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [joined, setJoined] = useState(false);

//   // const notificationSound = new Audio('/notification.wav'); // Assuming it's in the public folder

//   // useEffect(() => {
//   //   socket.on('message', (msg) => {
//   //     setChatMessages((prevMessages) => [...prevMessages, msg]);
//   //     notificationSound.play();
//   //   });

//   //   return () => {
//   //     socket.off('message');
//   //   };
//   // }, []);

//   const notificationSound = useRef(new Audio('/mixkit-sci-fi-confirmation-914.wav')); // Update with the correct path to your .wav file

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('message', (msg) => {
//       setChatMessages((prevMessages) => [...prevMessages, msg]);
//       notificationSound.current.play(); // Play sound when a new message is received
//     });
    
//     return () => {
//       socket.off('message');
//     };
//   }, []);
//     // Cleanup on component unmount
//   //   return () => {
//   //     socket.off('message');
//   //   };
//   // }, [notificationSound]); // Include notificationSound in the dependency array

//   const joinGroup = () => {
//     if (name && groupId) {
//       socket.emit('joinGroup', { name, groupId });
//       setJoined(true);
//     }
//   };

//   const sendMessage = () => {
//     if (message && groupId) {
//       socket.emit('sendMessage', { name, message, groupId });
//       setMessage('');
//    }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {!joined ? (
//         <div>
//           <h2>Join Chat Group</h2>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Enter Group ID"
//             value={groupId}
//             onChange={(e) => setGroupId(e.target.value)}
//           />
//           <button onClick={joinGroup}>Join Group</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Group ID: {groupId}</h2>
//           <div style={{ border: '1px solid black', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//             {chatMessages.map((msg, index) => (
//               <div key={index}>{msg}</div>
//             ))}
//           </div>
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// const socket = io('https://mediaplate.onrender.com');
// const socket = io('http://localhost:5000');
const socket = io('https://mediaplate-4.onrender.com');

function App() {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  // const notificationSound = new Audio('/notification.wav'); // Assuming it's in the public folder

  // useEffect(() => {
  //   socket.on('message', (msg) => {
  //     setChatMessages((prevMessages) => [...prevMessages, msg]);
  //     notificationSound.play();
  //   });

  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);

  const notificationSound = useRef(new Audio('/mixkit-sci-fi-confirmation-914.wav')); // Update with the correct path to your .wav file

  useEffect(() => {
    socket.on('message', (msg) => {
      setChatMessages((prevMessages) => [...prevMessages, `${msg.name}: ${msg.message}`]);
      
      // Play sound only if the message is from someone else
      if (msg.from !== socket.id) {
        notificationSound.current.play();
      }
    });
  
    return () => {
      socket.off('message');
    };
  }, []);
  
  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.on('message', (msg) => {
  //     setChatMessages((prevMessages) => [...prevMessages, msg]);
  //     notificationSound.current.play(); // Play sound when a new message is received
  //   });
    
  //   return () => {
  //     socket.off('message');
  //   };
  // }, []);
    // Cleanup on component unmount
  //   return () => {
  //     socket.off('message');
  //   };
  // }, [notificationSound]); // Include notificationSound in the dependency array

  const joinGroup = () => {
    if (name && groupId) {
      socket.emit('joinGroup', { name, groupId });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message && groupId) {
      socket.emit('sendMessage', { name, message, groupId });
      setMessage('');
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
