'use client'
import React, { useCallback, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContextProps {
    sendMessage: (message: string) => any;
}

const SocketContext = React.createContext<SocketContextProps | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const sendMessage: SocketContextProps['sendMessage'] = useCallback((message: string) => {
        console.log(message);
    }, []);

    useEffect(() => {
        const socket = io('http://localhost:8000');
        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}