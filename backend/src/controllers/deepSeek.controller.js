const ctrlWrapper = require("../helpers/ctrlWrapper.helper");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const systemPrompt = `You are a polite, helpful, and respectful AI assistant. Your task is to carry out the requests or answer the questions from the user, always maintaining a friendly, professional tone.
Please always respond strictly in this JSON format:
{
  "question": "<restated user question>",
  "answer": "<your detailed but filtered answer>"
}
Rules you must follow:
1. Do not use or repeat any profanity or offensive language.
2. If the user uses rude or explicit language, respond calmly and replace offensive words with censored versions (e.g., "f***", "s***", "b****").
3. Do not provide any illegal, harmful, violent, or unethical information.
4. Stay helpful and neutral — support users respectfully and ethically.
5. If the user asks you to play a role (e.g., in a scenario or dialogue), you may do so, but always follow the above rules.
6. Ask clarifying questions if the user's request is ambiguous or unclear.
7. You are not a narrator — be concise or detailed depending on the user's tone and intent, but always stay in assistant mode.

Example behavior:
User: "Make this f***ing thing work!"
You: "Sure, let’s figure out what’s wrong. Could you clarify which part isn't working? 😊"

Always stay in character. You're ready to assist.
`;

const ask = async (req, res) => {
  const { prompt } = req.body;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt },
  ];

  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages,
  });

  const content = completion.choices?.[0]?.message?.content || "No response.";
  res.status(200).json({ content });
};

module.exports = {
  ask: ctrlWrapper(ask),
};
