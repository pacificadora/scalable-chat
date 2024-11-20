'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"
import classes from './page.module.css'

export default function Page() {
  const { sendMessage } = useSocket();
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
        <h1>All Messages Will Appear Here</h1>
      </div>
      <div>
        <input onChange={onChangeHandler} className={classes["chat-input"]} type="text" placeholder="Enter a message" />
        <button onClick={onClickHandler} className={classes["button"]}>Send</button>
      </div>
    </div>
  )
}
