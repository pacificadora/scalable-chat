'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContextProps {
    sendMessage: (message: string) => any;
    messages: string[];
}

const SocketContext = React.createContext<SocketContextProps | null>(null);

//creating custom hook to use socket context.
export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error('state is not available');
    }
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const sendMessage: SocketContextProps['sendMessage'] = useCallback((msg: string) => {
        socket?.emit('event:message', { message: msg });
    }, [socket]);

    const onMessageRecieved = useCallback((msg: string) => {
        console.log('from server message recieved>>>>', msg);
        const { message } = JSON.parse(msg) as { message: string };
        console.log('parsedMsg', message);
        setMessages((prev) => [...prev, message]);
    }, []);

    useEffect(() => {
        const socket = io('https://scalable-chat-1.onrender.com', {
            transports: ['websocket'],
        });
        socket.on('message', onMessageRecieved);
        setSocket(socket);
        return () => {
            socket.disconnect();
            socket.off('message', onMessageRecieved);
            setSocket(null);
        }
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    )
}