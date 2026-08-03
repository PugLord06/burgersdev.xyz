export const GET_LOG_DETAILS: Record<string, { userMsg: string; assistantMsg: string; fileLabel: string; codeTitle: string; code: string; language: string }> = {
  "studio-blueprint": {
    userMsg: "How do we host multiple games under isitstudios.com without cluttering the root directory?",
    assistantMsg: "I set up sub-path mapping in Vite. Each game lives in its own folder and compiles independently. The root page just acts as a clean launcher. Here is the Vite multi-page configuration for mapping the entries:",
    fileLabel: "vite.config.ts",
    codeTitle: "Vite Multi-page Settings",
    language: "typescript",
    code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Multi-page bundler configuration mapping independent games
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game1: resolve(__dirname, "games/dungeon-crawler/index.html"),
        game2: resolve(__dirname, "games/platformer-jump/index.html"),
      }
    },
    outDir: "dist"
  }
});`
  },
  "studio-landing": {
    userMsg: "Let's review the main landing component layout for isitstudios.com. Keep it clean and gamified.",
    assistantMsg: "This React structure sets up the hero panel, hooks up a canvas grid overlay, and maps game releases. It's clean and responsive:",
    fileLabel: "StudioLanding.tsx",
    codeTitle: "Landing Hero Page Component",
    language: "tsx",
    code: `import React from 'react';

export default function StudioLanding() {
  return (
    <div className="min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative text-center space-y-6 max-w-2xl px-6">
        <h1 className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 font-heading">
          IS IT STUDIOS
        </h1>
        <p className="text-slate-400 text-sm">
          Procedurally curated and community verified indie games. Launched June 2026.
        </p>
        <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-all cursor-pointer">
          Enter Arcade
        </button>
      </div>
    </div>
  );
}`
  },
  "studio-pipeline": {
    userMsg: "Let's automate pushes to main branch so it builds, runs tests, and deploys isitstudios.com direct to production.",
    assistantMsg: "Here is the GitHub actions workflow. It handles npm installs, triggers Vitest checks, and deploys the build direct to production:",
    fileLabel: "deploy.yml",
    codeTitle: "GitHub Action Deploy Configuration",
    language: "yaml",
    code: `name: Compile & Deploy Ecosystem
on:
  push:
    branches: [ main ]

jobs:
  validate-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Tests
        run: npm run test:ci
        
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-deploy@v2`
  },
  "cheating-hydration": {
    userMsg: "I'm running into NextJS hydration mismatches on isitcheatingif.com because of checking client dates on load. How do we bypass this?",
    assistantMsg: "Hydration errors happen when the server renders one string (without access to browser state like localStorage) and the client tries to inject another. The simplest fix is checking if the window has mounted before accessing browser APIs, or wrapping the state inside a standard React effect. Here is a hook that manages this securely:",
    fileLabel: "useLocalStorage.ts",
    codeTitle: "Hydration Safe LocalStorage Hook",
    language: "typescript",
    code: `import { useState, useEffect } from "react";

export function useHydratedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (error) {
      console.warn("Storage retrieval failed:", error);
    }
    setIsHydrated(true);
  }, [key]);

  return [state, setState, isHydrated] as const;
}`
  },
  "cheating-adsense": {
    userMsg: "Google AdSense rejected our verification for isitcheatingif.com citing 'Low Value Content'. What changes did you execute to fix this?",
    assistantMsg: "Google's scrapers require indexable text routes to approve sites for ads. Because isitcheatingif.com is mostly dynamic JS, the scrapers found nothing to read. I set up static routes that render text-based sitemaps and dilemma lists so search engines can read the content directly. Here is the router setup:",
    fileLabel: "seo-index.tsx",
    codeTitle: "Indexable SEO Router Integration",
    language: "tsx",
    code: `// Express static path extensions for AdSense crawler parsing
app.get("/dilemma-archive/:id", async (req, res) => {
  const dilemma = await db.getDilemma(req.params.id);
  
  // Render static meta tags and visible texts for scrapers
  res.send(\`
    <html>
      <head>
        <title>Is it cheating if: \${dilemma.text}</title>
        <meta name="description" content="Community consensus debate and ethical verdict analysis." />
      </head>
      <body>
        <h1>Relationship Dilemma Analysis</h1>
        <p>\${dilemma.text}</p>
        <div id="verdict">AI Verdict: \${dilemma.verdict}</div>
      </body>
    </html>
  \`);
});`
  },
  "cheating-discord": {
    userMsg: "Let's secure the Discord Webhook callback in the isitcheatingif.com backend API to prevent spammers from sending spoofed notifications.",
    assistantMsg: "Spammers can spoof webhook events by calling your API directly. To prevent this, check the cryptographic HMAC signature in the request headers using your Discord app credentials. Here is the Node.js middleware for verifying the payload signature:",
    fileLabel: "verifyWebhook.ts",
    codeTitle: "Crypto Signature Validation Middleware",
    language: "typescript",
    code: `import crypto from "crypto";

export function verifyDiscordPayload(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !rawBody) return false;
  
  // Create HMAC SHA256 string from body with credentials secret
  const hash = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from("sha256=" + hash)
  );
}`
  },
  "chat-pipeline": {
    userMsg: "Set up the WebSocket auth callback for burgerschat.",
    assistantMsg: "Before establishing a socket connection, validate the client's JWT session token in the connection middleware. If the token is invalid, reject the handshake immediately. Here is the configuration:",
    fileLabel: "socketServer.ts",
    codeTitle: "WebSocket Room Pipeline Hub",
    language: "typescript",
    code: `import { Server } from "socket.io";

export function initSocketPipeline(httpServer: any) {
  const io = new Server(httpServer, {
    cors: { origin: "https://burgerschat.dev" }
  });

  // Verify authentication web token before allowing handshake
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (token === "valid-session-jwt") return next();
    return next(new Error("Unauthorized connection stream rejected"));
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (roomName) => {
      socket.join(roomName);
      console.log(\`[SOCKET] Handshake verified: Client \${socket.id} joined \${roomName}\`);
    });
    
    socket.on("disconnect", () => {
      console.log(\`[SOCKET] Stream terminated: Client \${socket.id} disconnected\`);
    });
  });
}`
  },
  "chat-redis": {
    userMsg: "We need Redis to scale burgerschat websockets across multiple instances. Hook up the adapter.",
    assistantMsg: "I've imported the `@socket.io/redis-adapter` and hooked it to our pub/sub clients. This allows Socket.IO events to broadcast across every container instance running the backend:",
    fileLabel: "redisConfig.ts",
    codeTitle: "Redis Cluster Broadcast Adapter",
    language: "typescript",
    code: `import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import { Server } from "socket.io";

export async function configureRedisAdapter(io: Server) {
  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  pubClient.on("error", (err) => console.error("Redis Pub Error:", err));
  subClient.on("error", (err) => console.error("Redis Sub Error:", err));

  await Promise.all([pubClient.connect(), subClient.connect()]);

  io.adapter(createAdapter(pubClient, subClient));
  console.log("Redis cluster adapter connected and listening for cross-node broadcasts.");
}`
  },
  "chat-encryption": {
    userMsg: "Make sure all DMs are encrypted before saving them to the DB in burgerschat.",
    assistantMsg: "I've implemented AES-256-GCM symmetric encryption. It generates a unique initialization vector for every message and appends the auth tag to ensure the ciphertext hasn't been tampered with. Here's the cipher utility:",
    fileLabel: "cryptoUtils.ts",
    codeTitle: "AES-256-GCM Payload Encryption",
    language: "typescript",
    code: `import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
// Must be exactly 32 bytes for AES-256
const ENCRYPTION_KEY = process.env.MESSAGE_ENCRYPTION_KEY || "0123456789abcdef0123456789abcdef";

export function encryptMessage(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  // Format: iv:authTag:encryptedText
  return \`\${iv.toString("hex")}:\${authTag}:\${encrypted}\`;
}

export function decryptMessage(encryptedString: string) {
  const [ivHex, authTagHex, encryptedHex] = encryptedString.split(":");
  const decipher = crypto.createDecipheriv(
    ALGORITHM, 
    Buffer.from(ENCRYPTION_KEY), 
    Buffer.from(ivHex, "hex")
  );
  
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));
  
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}`
  },
  "cheating-engine": {
    userMsg: "Let's review the custom physics engine for the game.",
    assistantMsg: "I've set up a basic AABB (Axis-Aligned Bounding Box) collision detection system. It's lightweight and perfect for our 2D platformer. Here's the core collision logic:",
    fileLabel: "physicsEngine.ts",
    codeTitle: "AABB Collision Detection",
    language: "typescript",
    code: `interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function checkCollision(box1: Box, box2: Box): boolean {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

export function resolveCollision(player: Box, wall: Box) {
  // Simple resolution: push player back out of wall
  const overlapX = Math.min(
    player.x + player.width - wall.x,
    wall.x + wall.width - player.x
  );
  const overlapY = Math.min(
    player.y + player.height - wall.y,
    wall.y + wall.height - player.y
  );

  if (overlapX < overlapY) {
    if (player.x < wall.x) player.x -= overlapX;
    else player.x += overlapX;
  } else {
    if (player.y < wall.y) player.y -= overlapY;
    else player.y += overlapY;
  }
}`
  }
};
