import React, { useState, useRef, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import { ref, push, set } from 'firebase/database';
import { db } from '../firebase';

const Chatbox = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(true);
  const chatboxRef = useRef(null);
  const userInputRef = useRef(null);

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };

  const addDataToFirebase = async (data) => {
    try {
      const dataRef = ref(db, 'your_collection_name'); // Replace 'your_collection_name' with the actual collection name in your Firebase database
      const newPostRef = push(dataRef);
      
      // Set the data for the newly generated reference
      await set(newPostRef, data);
    } catch (error) {
      console.error('Error adding data to Firebase:', error);
      throw error; // You might want to handle the error in the calling function
    }
  };
  
  const addUserMessage = (message) => {
    const messageElement = (
      <div key={Date.now()} className="mb-2 text-right">
        <p className="inline-block px-4 py-2 text-white rounded-full bg-primary">{message}</p>
      </div>
    );

    const div = document.createElement('div');
    div.innerHTML = renderToString(messageElement);

    chatboxRef.current.appendChild(div.firstChild);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  const addBotMessage = (message) => {
    const messageElement = (
      <div key={Date.now()} className="mb-2">
        <p className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">{message}</p>
      </div>
    );
    chatboxRef.current.appendChild(messageElement);
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  const respondToUser = async (userMessage) => {
    try {
      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/chat/completions';
      const assistantId = 'asst_5iWWunkBevOA6SDjZqFzCI8Q';
  
      // Check if the user explicitly asks for Firebase data
      if (userMessage.toLowerCase().includes('data from firebase')) {
        const firebaseData = await fetchDataFromFirebase();
        addBotMessage(firebaseData);
      } else if (userMessage.toLowerCase().includes('add data to firebase')) {
        // Example: If user asks to add data to Firebase, you might parse the user's input and add it to the database
        const userData = parseUserDataFromUserMessage(userMessage);
        await addDataToFirebase(userData);
        addBotMessage('Data added to Firebase successfully!');
      } else {
        const response = await axios.post(
          apiUrl,
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a chatbot that speaks like a helpful assistant.' },
              { role: 'user', content: userMessage },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
  
        const botMessage = response.data.choices[0].message.content.trim();
  
        // Ensure the response is not empty before adding it to the chatbox
        if (botMessage) {
          const messageElement = (
            <div key={Date.now()} className="mb-2">
              <p className="inline-block px-4 py-2 text-gray-700 bg-gray-200 rounded-lg">{botMessage}</p>
            </div>
          );
  
          const div = document.createElement('div');
          div.innerHTML = renderToString(messageElement);
  
          chatboxRef.current.appendChild(div.firstChild);
          chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
      }
    } catch (error) {
      console.error('Error fetching/response from OpenAI or Firebase:', error);
    }
  };
  
  

  const handleSendButtonClick = () => {
    const userMessage = userInputRef.current.value;
    if (userMessage.trim() !== '') {
      addUserMessage(userMessage);
      respondToUser(userMessage);
      userInputRef.current.value = '';
    }
  };

  const handleUserInputKeyUp = (event) => {
    if (event.key === 'Enter') {
      const userMessage = userInputRef.current.value;
      addUserMessage(userMessage);
      respondToUser(userMessage);
      userInputRef.current.value = '';
    }
  };

  useEffect(() => {
    toggleChatbox(); // Automatically open the chatbox on page load
  }, []);

  return (
    <div>
      <div className={`fixed bottom-0 right-0 mb-4  md:mr-4 ${isChatboxOpen ? '' : 'hidden'}`}>
        {/* Additional UI elements if needed */}
      </div>
      <div id="chat-container" className={`fixed bottom-16 right-1 md:right-4 w-96 ${isChatboxOpen ? '' : 'hidden'}`}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 text-white border-b rounded-t-lg bg-primary">
            <p className="text-sm font-semibold">Ask Memo</p>
            
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div id="chatbox" ref={chatboxRef} className="p-4 overflow-y-auto h-80">
            {/* Chat messages will be displayed here */}
          </div>
          <div className="flex p-4 border-t">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 text-sm border rounded-l-md focus:outline-none "
              ref={userInputRef}
              onKeyUp={handleUserInputKeyUp}
            />
            <button
              id="send-button"
              className="px-4 py-2 text-sm text-white transition duration-300 bg-primary rounded-r-md "
              onClick={handleSendButtonClick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
