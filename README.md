# Michael Burgers — Software Engineer Portfolio 💻⚡

[![Live Demo](https://img.shields.io/badge/Live_Demo-burgersportfolio.web.app-6366f1?style=for-the-badge&logo=firebase)](https://burgersportfolio.web.app)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Firebase_Hosting-ffca28?style=for-the-badge&logo=githubactions)](https://github.com/PugLord06/burgersdev.xyz/actions)
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-FastAPI_%2B_RAG-009688?style=for-the-badge&logo=fastapi)](https://github.com/PugLord06/burgersdev.xyz-backend)

A high-performance, interactive **IDE-themed Developer Portfolio** built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. 

Designed to look and feel like a modern IDE, complete with file tree navigation, interactive code viewports, real-time AI Assistant chat, and an integrated ATS resume PDF engine.

---

## ✨ Features

* 🎨 **VS Code IDE Aesthetic:** Interactive sidebar file explorer, breadcrumb paths, command palette UI, and theme toggling (Dark/Light mode).
* 🤖 **RAG AI Assistant Integration:** Integrated AI chat interface with real-time SSE streaming connected to a [FastAPI & Gemini RAG Backend](https://github.com/PugLord06/burgersdev.xyz-backend).
* 📄 **Dynamic ATS Resume Generation:** Python-powered ReportLab script (`scratch/generate_resume_pdf.py`) that outputs clean, ATS-compliant PDF resumes on demand.
* 🚀 **Interactive Project Showcase:** Highlights flagship projects like **Isitcheatingif.com** (500+ MAU, 13% Search CTR), **LekkerFinds.co.za**, and **Anarchy Gaming**.
* ⚡ **Automated CI/CD:** Fully automated deployments to **Firebase Hosting** via GitHub Actions on every push to `main`.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS, Lucide React Icons
* **PDF Engine:** Python 3, ReportLab
* **Hosting:** Firebase Hosting (Edge CDN)
* **CI/CD:** GitHub Actions

---

## 📂 Project Structure

```text
portfolio-ide/
├── public/                 # Static assets & generated Resume PDF
├── scratch/
│   └── generate_resume_pdf.py # ATS PDF Resume generator script
├── src/
│   ├── components/         # Reusable UI components (Sidebar, Topbar, Terminal)
│   ├── data/               # Centralized data store (Projects, Resume details)
│   ├── hooks/              # Custom hooks (AI Chat SSE client)
│   └── pages/              # Views (IDE View, About, Resume, Projects, AI Chat)
├── .github/workflows/      # Automated Firebase deployment GitHub Actions
├── firebase.json           # Firebase Hosting configuration
└── vite.config.ts          # Vite build settings
```

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PugLord06/burgersdev.xyz.git
   cd burgersdev.xyz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set Environment Variables:**
   Create a `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📜 License

MIT © [Michael Burgers](https://github.com/PugLord06)
