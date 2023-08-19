import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { callout } from "../../utils/helpers";
import { ReviewTypes, Review } from "../../components/review/types";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: 'https://api.openai.com/v1'
});

const openai = new OpenAIApi(configuration);

const model: string = 'gpt-3.5-turbo';

const intro: string = `
    When reviewing books respond with a JSON object with the following fields
    - review: string
    - rating: float (5 highest and 1 lowest)
    - reason: string

    Review should be at least 5 sentences long
    Rating must have a decimal place
    Reason should not be more than 2 sentences

    If you can't come up with a review, respond in the same JSON format.
    Use the review property to output your response.
`;

type History = [
    string | undefined,
    string | undefined
];

const history: History[] = [];
// Handle all requests after initialization
// using the historical context
export async function openAIChat (content: string): Promise<Review> {
    const messages: ChatCompletionRequestMessage[] = [];

    messages.push(
        { role: "user", content: history[0][0] },
        { role: "assistant", content: history[0][1] },
        { role: "user", content }
    );

    const completion = await openai.createChatCompletion({
        model,
        messages
    });

    const completionString: string = completion.data.choices[0].message?.content ?? '';

    history.push([content, completionString]);
    const res = JSON.parse(completionString);
    res.type = ReviewTypes.ChatGPT;

    return res;
};

// Initialize the conversation when the server starts
(async function (): Promise<void> {
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

    history.push([intro, completion?.data?.choices[0].message?.content]);
    console.info('ChatGPT: Loaded');
})();
