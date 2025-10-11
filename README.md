# 💬 Real-Time Chat Application

A modern real-time chat application built with **Next.js**, featuring **group chats**, **private messaging**, **voice calls**, and **video calls**.  
It includes secure authentication, media uploads, and a responsive UI for a smooth communication experience.

---

## 🚀 Features

- 💬 **Real-time messaging** (one-to-one and group chats)  
- 🔔 **Instant notifications** for new messages and calls  
- 📷 **Image uploads** using [UploadThing](https://uploadthing.com/)  
- 🔐 **User authentication** and session management with [Clerk](https://clerk.dev/)  
- 🎥 **Voice and video calling** integration  
- 🧑‍💻 **Responsive UI** built with React, Tailwind CSS, and modern design principles  
- ⚙️ **Scalable architecture** with Next.js App Router and API routes  

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)  
- **Frontend:** React, Tailwind CSS, ShadCn  
- **Authentication:** Clerk  
- **File Uploads:** UploadThing  
- **Real-time Communication:** WebSocket / Socket.io  
- **Database:** Postges SQL, Prisma ORM

---

## 🧩 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
npm install
npm run dev
```
---
Before running the project, create a .env.local file in the root directory and add the following:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

NEXT_PUBLIC_WEBSOCKET_URL=your_socket_server_url
```

