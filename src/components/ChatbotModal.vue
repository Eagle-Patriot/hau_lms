<template>
  <div class="chatbot-container">
    <div class="chatbot-icon" @click="toggleChatbot">
      <ChatbotIcon />
    </div>
    <div class="chatbot-popup" v-if="isChatbotOpen">
      <div class="header">
        <h3>Chatbot Assistant</h3>
        <button class="close-btn" @click="toggleChatbot">✕</button>
      </div>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" :class="message.sender">
          {{ message.text }}
        </div>
      </div>
      <div class="input-container">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChatbotIcon from "../icons/ChatbotIcon.vue";

const API_KEY = process.env.OPEN_AI_KEY;
const DEFAULT_RESPONSE = "Sorry, I don't understand that. Please focus on topics related to AI and Innovation";

async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error("Error getting response from OpenAI:", error);
    return DEFAULT_RESPONSE;
  }
}

function cleanseInput(str) {
  let temp = str.replace(/[^a-zA-Z0-9 ]/g, "");
  return temp.trim().toLowerCase();
}

async function getResponse(msg) {
  let cleansed = cleanseInput(msg);
  return await getChatGPTResponse(cleansed);
}

export default {
  components: {
    ChatbotIcon
  },
  data() {
    return {
      userInput: "",
      messages: [],
      isChatbotOpen: false
    };
  },
  methods: {
    toggleChatbot() {
      this.isChatbotOpen = !this.isChatbotOpen;
    },
    async sendMessage() {
      const userMessage = this.userInput;
      if (!userMessage) return;

      // Add user's message to messages array
      this.messages.push({ sender: "user", text: userMessage });
      this.userInput = "";

      try {
        // Get response from ChatGPT
        const botResponse = await getResponse(userMessage);
        this.messages.push({ sender: "bot", text: botResponse });
      } catch (error) {
        console.error('Error in sendMessage:', error);
      }
    }
  }
};
</script>

<style>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chatbot-icon {
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.chatbot-popup {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 400px;
  height: 600px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border-bottom: 1px solid #ccc;
}

.header h3 {
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.messages .user {
  text-align: right;
  margin-bottom: 10px;
  background: #dcf8c6;
  padding: 5px 10px;
  border-radius: 10px;
}

.messages .bot {
  text-align: left;
  margin-bottom: 10px;
  background: #f1f0f0;
  padding: 5px 10px;
  border-radius: 10px;
}

.input-container {
  display: flex;
  border-top: 1px solid #ccc;
  padding: 10px;
  background: #f9f9f9;
  align-items: center;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
