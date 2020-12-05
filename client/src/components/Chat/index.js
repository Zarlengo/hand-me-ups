import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import API from '../../utils/API';
import GlobalContext from '../../utils/GlobalContext';
import MessageLine from '../MessageLine';
import UserLine from '../UserLine';

function Chat() {
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [output, setOutput] = useState([]);
    const currentUser = API.getCurrentUser({});
    const [notificationCount, setNotificationCount] = useState(0);
    const [users, setUsers] = useState([]);

    const { socket } = useContext(GlobalContext);

    useEffect(() => {
        API.getLoggedOn().then((response) => {
            setUsers(response);
        });
    }, []);

    const handleMessage = (event) => {
        setMessage(event.target.value);
        socket.emit('typing', currentUser.firstName);
    };

    const handleSend = (event) => {
        event.preventDefault();
        socket.emit('chat', {
            author: currentUser.firstName,
            message: message,
        });
        setMessage('');
    };

    const handleShowUsers = () => {
        API.getLoggedOn().then((response) => {
            setUsers(response);
        });
        setShowUsers(true);
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
            {showUsers ? (
                <div>
                    <div className="user-popup">
                        <h4>Logged in users:</h4>
                        <div className="user-area">
                            {users.map((user, index) => (
                                <UserLine key={index} user={user} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
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
                            <form
                                id="chatSend"
                                className="messageInput"
                                onSubmit={(event) => {
                                    handleSend(event);
                                }}
                            >
                                <input
                                    id="message"
                                    type="text"
                                    className="messageInput"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(event) => handleMessage(event)}
                                />
                            </form>
                            <button
                                form="chatSend"
                                value="submit"
                                type="submit"
                                className="submit"
                                id="send"
                                onSubmit={(event) => {
                                    handleSend(event);
                                }}
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
                    onMouseOver={() => handleShowUsers()}
                    onMouseOut={() => setShowUsers(false)}
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
