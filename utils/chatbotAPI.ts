import axios from "axios";

export class ChatbotAPI {
    constructor(private apiKey: string) { }

    async generateText(prompt: string): Promise<string> {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/engines/davinci-codex/completions",
                {
                    prompt: prompt,
                    max_tokens: 50,
                    n: 1,
                    stop: ["\n"],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );

            if (response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].text;
            } else {
                return "The Chatbot API could not generate a video script.";
            }
        } catch (error) {
            throw error;
        }
    }
}
