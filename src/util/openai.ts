import { AzureOpenAI } from "openai";
// import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import axios from 'axios';

export const getOnYourData = async (message: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

        const endpoint = process.env.AZURE_OPENAI_API_ENDPOINT!
        const azureApiKey = process.env.AZURE_OPENAI_API_KEY!
        const deploymentId = process.env.AZURE_OPENAI_API_DEPLOYMENT_ID!
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION!
        const apiUrl = process.env.AZURE_OPENAI_API_URL!

        const requestData = {
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "gpt-4o-mini",
            max_tokens: 1000
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${azureApiKey}`
        };

        const res = await axios.post(apiUrl, requestData, { headers });

        //console.log('res:', res.data)

        const content = `
        # 質問
        ${message}
        # 回答
        ${res.data}
        `

        const messages: any[] = [
            {
                role: 'system',
                content: 'You are a helpful assistant.'
            },
            {
                role: 'user',
                content: content
            }
        ]
        const client = new AzureOpenAI({
            endpoint: endpoint,
            apiKey: azureApiKey,
            deployment: deploymentId,
            apiVersion: apiVersion})

        const result = await client.chat.completions.create({
            messages: messages,
            model: '',
            max_tokens: 1000 });

        resolve(result.choices);
    }
)}