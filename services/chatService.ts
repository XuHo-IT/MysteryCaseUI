
import * as signalR from "@microsoft/signalr";

const API_BASE_URL = "https://localhost:7029"; // Backend API URL

interface ChatMessage {
    username: string;
    message: string;
    timestamp: Date;
}

interface UserEvent {
    username: string;
    timestamp: Date;
}

class ChatService {
    private connection: signalR.HubConnection | null = null;
    private onReceiveMessageCallback: ((message: ChatMessage) => void) | null = null;
    private onUserJoinedCallback: ((userEvent: UserEvent) => void) | null = null;
    private onUserLeftCallback: ((userEvent: UserEvent) => void) | null = null;

    public async startConnection(token: string): Promise<void> {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            console.log("Already connected to ChatHub.");
            return;
        }

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${API_BASE_URL}/chathub?access_token=${token}`)
            .withAutomaticReconnect()
            .build();

        this.connection.on("ReceiveMessage", (username: string, message: string, timestamp: string) => {
            const chatMessage: ChatMessage = { username, message, timestamp: new Date(timestamp) };
            this.onReceiveMessageCallback?.(chatMessage);
        });

        this.connection.on("UserJoined", (username: string, timestamp: string) => {
            const userEvent: UserEvent = { username, timestamp: new Date(timestamp) };
            this.onUserJoinedCallback?.(userEvent);
        });

        this.connection.on("UserLeft", (username: string, timestamp: string) => {
            const userEvent: UserEvent = { username, timestamp: new Date(timestamp) };
            this.onUserLeftCallback?.(userEvent);
        });

        try {
            await this.connection.start();
            console.log("SignalR Connected to ChatHub.");
        } catch (err) {
            console.error("Error connecting to ChatHub: ", err);
        }
    }

    public async stopConnection(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            console.log("SignalR Disconnected from ChatHub.");
        }
    }

    public async sendMessage(message: string): Promise<void> {
        if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            try {
                await this.connection.invoke("SendMessage", message);
            } catch (err) {
                console.error("Error sending message: ", err);
            }
        } else {
            console.warn("Not connected to ChatHub. Cannot send message.");
        }
    }

    public onReceiveMessage(callback: (message: ChatMessage) => void): void {
        this.onReceiveMessageCallback = callback;
    }

    public onUserJoined(callback: (userEvent: UserEvent) => void): void {
        this.onUserJoinedCallback = callback;
    }

    public onUserLeft(callback: (userEvent: UserEvent) => void): void {
        this.onUserLeftCallback = callback;
    }

    public getConnection(): signalR.HubConnection | null {
        return this.connection;
    }
}

export const chatService = new ChatService();
