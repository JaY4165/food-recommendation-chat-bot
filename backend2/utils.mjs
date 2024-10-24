import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

export const API_KEY = "";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function initializeModel(diet, factor) {
  const prompt = [
    {
      role: "user",
      parts: [
        {
          text: 'const prompt = [\n    {\n      role: "assistant",\n      content:\n        "You are a food recommendation chatbot. You provide food recommendations based on user\'s dietary preferences and other factors. Each recommendation should include the name of the dish, a brief description, and when clicked, a detailed recipe should be provided.",\n    }',
        },
      ],
    },
  ];

  const chatSession = model.startChat({
    generationConfig,
    history: prompt,
  });

  const message = `Based on the following preferences: Diet: ${diet}, Factors:${factor}, please recommend some dishes with a brief description. Give response in format [{ name, description}]`;
  const result = await chatSession.sendMessage(message);
  const resp = result.response.text();
  const parsedRes = resp;

  return parsedRes;
}

export async function initializeModelForRecipe(food) {
  const prompt = [
    {
      role: "user",
      parts: [
        {
          text: 'const prompt = [\n    {\n      role: "assistant",\n      content:\n         "You are a food recommendation chatbot. Provide a detailed recipe when requested for a specific dish.",\n    }',
        },
      ],
    },
  ];

  const chatSession = model.startChat({
    generationConfig,
    history: prompt,
  });
  const msg = ``;
  const message = `Please provide a detailed recipe for ${food.name} in the format of  {name : string , recipe : {ingredients : [], instructions : [] }}  in json format.`;
  const result = await chatSession.sendMessage(message);
  const resp = result.response.text();
  const parsedRes = resp;
  console.log(JSON.parse(parsedRes));
  return parsedRes;
}
