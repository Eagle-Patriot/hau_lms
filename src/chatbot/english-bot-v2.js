import axios from "axios";

const API_KEY = "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";
const DEFAULT_RESPONSE =
  "Sorry, I don't understand that. Please focus on topics related to AI and Innovation";

async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150, // Adjust this value based on your needs
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].message.content.trim();
    } else {
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error("Error getting response from OpenAI:", error);
    return DEFAULT_RESPONSE;
  }
}

export async function getResponse(msg) {
  let cleansed = cleanseInput(msg);
  return await getChatGPTResponse(cleansed);
}

function cleanseInput(str) {
  let temp = str.replace(/[^a-zA-Z0-9 ]/g, "");
  return temp.trim().toLowerCase();
}

// Example usage in an async function
async function handleMessage(msg) {
  const response = await getResponse(msg);
  console.log(response);
}

// Call handleMessage with an example message
handleMessage("Tell me about AI");

// Example usage in a non-async context
getResponse("Tell me about AI")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
