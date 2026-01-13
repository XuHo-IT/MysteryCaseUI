import React, { useState, useEffect, FormEvent } from 'react';
import { chatService } from '../../services/chatService';
import { useAuth } from '../../contexts/AuthContext'; // Corrected import to use useAuth hook

interface ChatMessage {
    username: string;
    message: string;
    timestamp: Date;
}

interface UserEvent {
    username: string;
    timestamp: Date;
    message: string; // Added message property to UserEvent interface
}

const ChatRoom: React.FC = () => {
    const { token } = useAuth(); // Corrected context usage to get token
    const [messages, setMessages] = useState<(ChatMessage | UserEvent)[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        if (token) { // Use token instead of authToken
            chatService.startConnection(token)
                .then(() => {
                    setIsConnected(true);

                    chatService.onReceiveMessage(msg => {
                        setMessages(prevMessages => [...prevMessages, msg]);
                    });

                    chatService.onUserJoined(userEvent => {
                        setMessages(prevMessages => [...prevMessages, { ...userEvent, message: `${userEvent.username} joined the chat.` }]);
                    });

                    chatService.onUserLeft(userEvent => {
                        setMessages(prevMessages => [...prevMessages, { ...userEvent, message: `${userEvent.username} left the chat.` }]);
                    });

                })
                .catch(err => console.error("Error starting chat connection:", err));
        }

        return () => {
            chatService.stopConnection();
        };
    }, [token]); // Dependency array updated to token

    const sendMessage = (event: FormEvent) => {
        event.preventDefault();
        if (messageInput.trim() && isConnected) {
            chatService.sendMessage(messageInput);
            setMessageInput('');
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        return timestamp.toLocaleTimeString();
    };

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Chat Room</h2>
            {!token && <p style={{ color: 'red', textAlign: 'center' }}>Please log in to join the chat.</p>} {/* Use token */}
            <div style={{ border: '1px solid #eee', height: '400px', overflowY: 'scroll', marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
                {messages.map((item, index) => (
                    <div key={index} style={{ marginBottom: '5px' }}>
                        {('username' in item && 'message' in item && item.message !== undefined) ? ( // Ensure item.message is present and not undefined
                            <p><strong>{item.username}</strong> ({formatTimestamp(item.timestamp)}): {item.message}</p>
                        ) : (
                            <p style={{ color: '#888' }}>{item.message} ({formatTimestamp(item.timestamp)})</p> // Directly use item.message for UserEvent
                        )}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!isConnected}
                    style={{ flexGrow: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px 0 0 4px', marginRight: '-1px' }}
                />
                <button
                    type="submit"
                    disabled={!isConnected || !messageInput.trim()}
                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}
                >
                    Send
                </button>
            </form>
            {!isConnected && token && <p style={{ color: 'orange', textAlign: 'center' }}>Connecting to chat...</p>} {/* Use token */}
        </div>
    );
};

export default ChatRoom;
