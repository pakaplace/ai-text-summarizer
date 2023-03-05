// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export const IPFS_API_KEY: string = "dc3bde533f1eacfffb6cbd5850d286ae";

import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-vkePJXYDpXRuQr8CXa4GIyG1",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type Data = {
  data: any; //CreateCompletionResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize the following into 4 bullet points: ${prompt}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ data: response });
}
