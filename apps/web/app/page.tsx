'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"
import classes from './page.module.css'

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }

  const onClickHandler = () => {
    sendMessage(message);
  }

  return (
    <div>
      <div>
        <input onChange={onChangeHandler} className={classes["chat-input"]} type="text" placeholder="Enter a message" />
        <button onClick={onClickHandler} className={classes["button"]}>Send</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  )
}
