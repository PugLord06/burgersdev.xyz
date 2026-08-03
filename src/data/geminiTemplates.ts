export interface Template {
  name: string;
  system: string;
  user: string;
  response: string;
}

export const TEMPLATES: Record<string, Template> = {
  "dilemma": {
    name: "Relationship Dilemma Generator",
    system: "You are the isitcheatingif.com Content Engine. Generate a controversial relationship dilemma for social debates.",
    user: "Generate a scenario involving social media behavior and an ex-partner.",
    response: "Is it cheating if your partner keeps an archived photo folder of their ex-partner, and updates the folder with new public posts because they want to 'archive their style evolution'?"
  },
  "coder": {
    name: "Real-time WebSocket Coder",
    system: "You are an expert full-stack TypeScript agent. Generate a clean Socket.io connection pipeline with authorization.",
    user: "Write a client-side Socket.io handshake wrapper in TypeScript.",
    response: `import { io, Socket } from "socket.io-client";

export class ChatSocketClient {
  private socket: Socket;

  constructor(token: string) {
    this.socket = io("https://api.burgerschat.dev", {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5
    });

    this.socket.on("connect", () => {
      console.log("[SOCKET] Connected. Node thread verified.");
    });
  }
}`
  },
  "golden-key": {
    name: "Academic Verification Engine",
    system: "You are the Eduvos Registrar bot. Explain the requirements for Golden Key International Honour Society invitations.",
    user: "What are the exact invitation criteria for South African cohorts?",
    response: "Academic ranking criteria require a cumulative Grade Point Average (GPA) placing the student in the Top 15% of the specific program cohort. For BSc in Software Engineering, this generally equates to maintaining a 85% average across all second and third-year modules."
  }
};
