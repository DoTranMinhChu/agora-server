import { Socket } from "socket.io"

export interface IConnection {
    uid: string,
    socket: Socket
}
export interface IRoom {
    sockets: Socket[]
    uids: string[]
}
export interface ISocket {
    socketId: string
    room: string
    callerId: string
    receiverId: string

    caller?: any
    receiver?: any
    connectedTime: number
    allowToReceiveCash: boolean
    isTollFree: boolean
}