// Packages
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
// Utils
import { callout } from "../../utils/helpers";
// Types
import { ReviewTypes, Review } from "../../components/reviews/types";
type History = [
    string | undefined,
    string | undefined
];
// Helpers
import { log } from '../../utils';
// Setup our config for OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.OPENAI_API_PATH
});
// Connect to OpenAI
const openai = new OpenAIApi(configuration);
// Chat model
const model: string = process.env.OPENAI_API_MODEL ?? 'gpt-3.5-turbo';
// Chat initialization
const intro: string = `
    When reviewing books respond with a JSON object with the following fields
    - review: string
    - rating: float (5.0 being highest and 0 being lowest)
    - reason: string

    Review should be at least 5 sentences long
    Rating must have a decimal place. Average the rating based on other user reviews. 
    Reason should not be more than 2 sentences

    If you can't come up with a review, respond in the same JSON format.
    Use the review property to output your response.
`;
//Class representing OpenAI
class OpenAI {
    // Conversations historical cache
    history: History[] = [];
    /**
     * Handle all requests after initialization using the historical context
     * 
     * @param {string} content - Content to review
     *
     * @return {Promise<Review>} Promise that resolves a review
     *
     * @example
     *
     *     await openAIChat(content);
     */
    async chat (content: string): Promise<Review> {
        // Check if the history as been initialized
        if (!this.history.length) await this.init();
        // Define out messages store
        const messages: ChatCompletionRequestMessage[] = [];
        // Store out historical conversation in messages
        messages.push(
            { role: "user", content: this.history[0][0] },
            { role: "assistant", content: this.history[0][1] },
            { role: "user", content }
        );
        // Send message to bot
        const completion = await openai.createChatCompletion({
            model,
            messages
        });
        // Retrieve response from bot
        const completionString: string = completion.data.choices[0].message?.content ?? '';
        // Add to the historical conversation
        this.history.push([content, completionString]);
        // We receive a JSON object in the response
        // so we need to parse it for use
        const review = JSON.parse(completionString);
        // Set the type of review
        review.type = ReviewTypes.ChatGPT;
        // Review we'd like to return
        return review;
    }
    /**
     * Initializes chat context and sets the rules of engagement
     *
     * @return {Promise<void>} Promise that resolves nothing
     *
     * @example
     *
     *     await this.init();
     */
    // Initialize the conversation when the server starts
    private async init (): Promise<void> {
        const messages: ChatCompletionRequestMessage[] = [
            { role: "user", content: intro }
        ];

        const [err, completion] = await callout(openai.createChatCompletion({
            model,
            messages
        }));
        // Handle Errors
        if (err) {
            console.error(err.status, err.message);
        }

        this.history.push([intro, completion?.data?.choices[0].message?.content]);
        log('ChatGPT: Initialized');
    }
}
// Expose OpenAI class
export default new OpenAI();
