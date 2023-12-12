"use client";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
} from "react";
import { io } from "socket.io-client";

interface ISocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<ISocketProviderProps> = ({
    children,
}) => {
    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("send message >>> ", msg);
    }, []);

    useEffect(() => {
        const _socket = io("http://localhost:8080");
        return () => {
            _socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={sendMessage}>
            {children}
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error("State is undefined");
    }
    return state;
};
