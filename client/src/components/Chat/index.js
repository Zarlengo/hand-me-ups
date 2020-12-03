import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import API from '../../utils/API';
import MessageLine from '../MessageLine';

const io = require('socket.io-client');
const socket = io({
    withCredentials: true,
    extraHeaders: {
        'hand-me-ups': 'header-content',
    },
});

function Chat() {
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [output, setOutput] = useState([]);
    const currentUser = API.getCurrentUser({});
    const [notificationCount, setNotificationCount] = useState(0);

    const handleMessage = (event) => {
        setMessage(event.target.value);
        socket.emit('typing', currentUser.firstName);
    };

    const handleSend = () => {
        socket.emit('chat', {
            author: currentUser.firstName,
            message: message,
        });
        setMessage('');
    };

    // Listen for events
    socket.on('chat', (data) => {
        setFeedback('');
        setShowFeedback(false);
        setOutput([...output, data]);
        if (!showPopup) {
            setNotificationCount(notificationCount + 1);
        }
    });

    socket.on('typing', (data) => {
        setFeedback(data);
        setShowFeedback(true);
    });

    return (
        <section className="chat-section">
            {showPopup ? (
                <div>
                    <div className="chat-popup">
                        <div className="chat-area">
                            <div className="income-msg">
                                <div className="feedback">
                                    <em>
                                        {showFeedback
                                            ? `${feedback} is typing a message...`
                                            : ''}
                                    </em>
                                </div>
                                <div className="output">
                                    {output.map((line, index) => (
                                        <MessageLine
                                            key={index}
                                            line={line}
                                            author={currentUser.firstName}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="input-area">
                            <input
                                id="message"
                                type="text"
                                placeholder="Message"
                                value={message}
                                onChange={(event) => handleMessage(event)}
                            />
                            <button
                                className="submit"
                                id="send"
                                onClick={() => handleSend()}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    <div
                        className="notification chat-btn"
                        onClick={() => {
                            setShowPopup(!showPopup);
                            setNotificationCount(0);
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                </div>
            ) : (
                <div
                    className="notification chat-btn"
                    onClick={() => {
                        setShowPopup(!showPopup);
                        setNotificationCount(0);
                    }}
                >
                    <FontAwesomeIcon icon={faUser} />
                    {notificationCount > 0 ? (
                        <span className="badge">{notificationCount}</span>
                    ) : (
                        ''
                    )}
                </div>
            )}
        </section>
    );
}

export default Chat;
