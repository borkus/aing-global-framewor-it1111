# AING™ Global Framework

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/borkus/aing-global-framework)

A comprehensive web portal for the AING™ framework, offering detailed documentation, professional certifications, an e-learning academy, and a global community.

AING™ Global Framework is a comprehensive, professional web portal designed to establish the Artificial Intelligence Next Generation (AING) Framework as a global standard for AI-era work management. The platform will serve as the central hub for education, certification, community engagement, and methodology access. It features a vast, structured library of content across 100+ pages, detailing the framework's philosophy, modules, lifecycle, and governance. The user experience is designed to be authoritative, intuitive, and visually stunning, reflecting the cutting-edge nature of the AING framework.

## ✨ Key Features

*   **Comprehensive Framework Documentation**: Over 100+ dynamically rendered pages detailing the AING™ methodology, principles, and lifecycle.
*   **Professional Certification Hub**: A complete ecosystem for AING™ certifications, from Foundation to Enterprise levels.
*   **E-Learning Academy**: An integrated portal for online courses, training materials, and learning paths.
*   **Global Community & Membership**: Sections for professional networking, community forums, events, and news.
*   **AI-Powered Assistant**: A built-in chatbot, powered by Cloudflare Agents, to answer questions about the framework.
*   **Scalable Architecture**: Built on Cloudflare Workers and Durable Objects for a globally fast and resilient experience.
*   **Visually Stunning UI**: A modern, professional design built with Tailwind CSS and shadcn/ui for an exceptional user experience.

## 🛠️ Technology Stack

*   **Frontend**: React, Vite, React Router, TypeScript
*   **Backend**: Cloudflare Workers, Hono, Cloudflare Agents (Durable Objects)
*   **Styling**: Tailwind CSS, shadcn/ui, Framer Motion
*   **AI Integration**: OpenAI SDK, Cloudflare AI Gateway
*   **State Management**: Zustand
*   **Package Manager**: Bun

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A Cloudflare account.
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd aing_global_framework
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

### Environment Variables

For local development, create a `.dev.vars` file in the root of the project and add the following environment variables. These are used by the local Wrangler development server.

```ini
CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
CF_AI_API_KEY="your-cloudflare-api-key"
```

Replace the placeholder values with your actual Cloudflare AI Gateway details.

## 💻 Development

To start the local development server, which includes both the Vite frontend and the Wrangler backend worker, run:

```bash
bun dev
```

This will start the application, typically available at `http://localhost:3000`. The frontend will hot-reload on changes, and the worker backend will be accessible for API requests.

## ☁️ Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Configure Production Secrets**:
    Before deploying, you need to set your environment variables as secrets in your Cloudflare dashboard.
    ```bash
    npx wrangler secret put CF_AI_BASE_URL
    npx wrangler secret put CF_AI_API_KEY
    ```
    Follow the prompts to add your secret values.

2.  **Deploy the application:**
    Run the deploy script to build the application and deploy it to your Cloudflare account.
    ```bash
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/borkus/aing-global-framework)

## 🤖 AI Assistant Backend

The project includes a powerful AI assistant backend built with Cloudflare Agents. The core logic resides in `worker/agent.ts` and `worker/chat.ts`.

*   **Persistent Conversations**: Chat history is maintained using Durable Objects.
*   **API Endpoint**: The chat API is accessible at `/api/chat/:sessionId/*`.
*   **Extensible**: New tools and capabilities can be added in `worker/tools.ts`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.