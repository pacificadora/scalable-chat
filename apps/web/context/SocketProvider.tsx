'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContextProps {
    sendMessage: (message: string) => any;
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

    const sendMessage: SocketContextProps['sendMessage'] = useCallback((msg: string) => {
        console.log('message', msg);
        console.log('socket', socket);
        socket?.emit('event:message', { message: msg });
    }, [socket]);

    useEffect(() => {
        const socket = io('http://localhost:8000');
        setSocket(socket);
        return () => {
            socket.disconnect();
            setSocket(null);
        }
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}