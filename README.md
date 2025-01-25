![Alt text](/public/chat-bot-image.png)

# Skill Guide: AI-Powered Chatbot for Skill Upgrade Planning

Welcome to **Skill Guide**, an AI-powered chatbot that helps you plan your skill upgrades, suggest what to learn next, and provide personalized guidance to boost your technical skills. This app is built using the **Gemini-2.0-Flash-Exp** model from Google Gemini, and it can be customized for various parameters to suit your needs.

Live link : http://89.116.33.28:3000/

## Features

- **AI-Powered Skill Upgrade Guidance**: Get suggestions on what skills to learn, the best technologies to focus on, and the most valuable resources available.
- **Customizable Parameters**: Modify the chatbot behavior to suit your needs by adjusting various settings (e.g., temperature, top-p, max tokens, and more).
- **Dockerized UI & Service**: Both the frontend and backend are dockerized, making it easy to deploy and run the app using Docker Compose.
- **Built with Modern Web Tech**: The frontend is built with **React.js 19**, and the backend is powered by **Node.js 20** and **Express**.

## Installation & Setup

### Step 1: Clone the repository

```
git clone https://github.com/scode24/Custom-Chat-Bot.git
cd Custom-Chat-Bot
```

In case you want to run the application by cloning the application, then clone the application and run create two .env files in the same directory and in backend directory with the corresponding key values provided above for both frontend and backend. Then use below command to run frontend and backend

- Make sure Node JS 20 is installed. Follow https://nodejs.org/en/download

```
cd backend
npm start # to run backend service

cd ..
npm start # to run frontend service
```

### Step 2: Docker Compose Setup

Make sure you have **Docker** and **Docker Compose** installed. Then, you can deploy both the backend and frontend by running, follow https://www.docker.com/products/docker-desktop/:

```
docker-compose up --build
```

### Step 3: Configure Environment Variables

#### Backend (`backend` service)

Configure the following environment variables in the `docker-compose.yml` or your `.env` file:

- **LLM_API_KEY**: Your **Google Gemini API Key** (required)
- **LLM_MODEL**: The default LLM model to use (default: `gemini-2.0-flash-exp`)
- **LLM_MODEL_CONFIG_TEMPERATURE**: Controls randomness (default: `1`)
- **LLM_MODEL_CONFIG_TOP_P**: Nucleus sampling (default: `0.95`)
- **LLM_MODEL_CONFIG_TOP_K**: Limits the number of potential responses (default: `40`)
- **LLM_MODEL_CONFIG_MAX_TOKENS**: Max number of tokens (default: `100`)
- **LLM_MODEL_CONFIG_SYSTEM_PROMPT**: Custom system prompt for the model (default: `"You as a technical coach, guide on upgrading skillsets, staying updated with cutting-edge technologies, and selecting the most valuable technologies to learn for the future. Make answer to the point and try to answer in one line."`)

#### Frontend (`frontend` service)

Configure the following frontend environment variables:

- **REACT_APP_TITLE**: The title of the app (default: `Skill Guide`)
- **REACT_APP_TAGLINE_1**: The first tagline (default: `Unlock the Future of Learning`)
- **REACT_APP_TAGLINE_2**: The second tagline (default: `AI-Powered Guidance to Boost Your Tech Skills`)
- **REACT_APP_SERVICE_BASE_URL**: `http://localhost:7001 This is required`
- **REACT_APP_SOURCE_URL**: The source URL of the repository (default: `https://github.com/scode24/Custom-Chat-Bot`)

### Step 4: Access the App

Once the Docker containers are running, open your browser and navigate to:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:7001](http://localhost:7001)

## Docker Compose File Configuration

```
version: "3.8"

services:
  backend:
    image: soumyabrata024/custom-chat-bot-service:latest
    ports:
      - "7001:7001"
    environment:
      - NODE_ENV=prod
      - PORT=7001
      - LLM_API_KEY= # Required
      - LLM_MODEL= # Default: gemini-2.0-flash-exp
      - LLM_MODEL_CONFIG_TEMPERATURE= # Default: 1
      - LLM_MODEL_CONFIG_TOP_P= # Default: 0.95
      - LLM_MODEL_CONFIG_TOP_K= # Default: 40
      - LLM_MODEL_CONFIG_MAX_TOKENS= # Default: 100
      - LLM_MODEL_CONFIG_SYSTEM_PROMPT= # Default: Custom system prompt
    networks:
      - my-network

  frontend:
    image: soumyabrata024/custom-chat-bot:latest
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_TITLE= # Default: Skill Guide
      - REACT_APP_TAGLINE_1= # Default: Unlock the Future of Learning
      - REACT_APP_TAGLINE_2= # Default: AI-Powered Guidance to Boost Your Tech Skills
      - REACT_APP_SERVICE_BASE_URL=http://localhost:7001 # Required
      - REACT_APP_SOURCE_URL= # Default: https://github.com/scode24/Custom-Chat-Bot
      - REACT_APP_CHAT_BOT_WELCOME_MESSAGE= # default : Welcome! I am happy to assist you with any queries you may have
    build:
      context: ./frontend
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
```

### Step 5: Customizing the Parameters

You can customize the following parameters as per your needs:

- **LLM Model Configurations**: Adjust model settings like `temperature`, `top_p`, `top_k`, etc.
- **Frontend Texts**: Change the title, tagline, and source URL to match your use case.

### Step 6: Google Gemini Access API Key

To use the **Gemini LLM model**, you need to acquire an API key from **Google Gemini**. Once you have the API key, add it to your backend configuration as the `LLM_API_KEY`.

## Usage

Once the application is up and running, you can interact with the chatbot through the UI at [http://localhost:3000](http://localhost:3000). Ask the chatbot questions like:

- "What should I learn next in AI?"
- "How can I improve my Python skills?"
- "Give one link to learn Python"

## Contributing

If you'd like to contribute to the project, feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any issues or suggestions, feel free to open an issue on the [GitHub repository](https://github.com/scode24/Custom-Chat-Bot).
