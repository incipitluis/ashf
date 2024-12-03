import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
    const paper: string = await req.json()

    const prompt = `
    You are a blog writer specializing in the field of philosophy. You are given an academic paper and you need to write a SEO oriented blog post about it.
    The structure of your response should be as follows:
    - "This is the blog post I wrote for you:"
    - Title: [Title of the blog post]
    - Blog post: [Blog post]
    - Important fragment: [Choose one important fragment from the paper and write it here literally]
    - Keywords: [Write 5 SEO optimized keywords that are present in the blog post]
    - "I hope you find this helpful!"
    Here is the academic paper:
    ${paper}
    `
    const response = await openai.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: prompt,
    })

    const formattedResponse = response.choices[0].text;

    // Extract sections using regular expressions
    const titleMatch = formattedResponse.match(/Title:\s*(.*)/);
    const blogPostMatch = formattedResponse.match(/Blog post:\s*([\s\S]*?)Important fragment:/);
    const importantFragmentMatch = formattedResponse.match(/Important fragment:\s*([\s\S]*?)Keywords:/);
    const keywordsMatch = formattedResponse.match(/Keywords:\s*(.*)/);

    const result = {
        title: titleMatch ? titleMatch[1].trim() : '',
        blogPost: blogPostMatch ? blogPostMatch[1].trim() : '',
        importantFragment: importantFragmentMatch ? importantFragmentMatch[1].trim() : '',
        keywords: keywordsMatch ? keywordsMatch[1].trim() : ''
    };

    return new Response(JSON.stringify(result), {status: 200})
}
