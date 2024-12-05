import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const prompts = {
    'paper': {
        prompt: "You are a blog writer specializing in the field of philosophy. You are given an academic paper and you need to write a SEO oriented blog post about it. Avoid in your response any use of special characters as * or #, so that the blog post can be easily parsed. The structure of your response should be exactly as follows so I can parse it and store it in a database:\n- \"This is the articleI wrote for you:\"\n- Title: [Title of the blog post]\n- Blog post: [Content of the blog post. Three paragraphs long]\n- Important fragment: [Choose one important fragment from the paper and write it here literally, translated into english]\n- Keywords: [Write 5 SEO optimized keywords that are present in the blog post. One of them has to be either moderna, medieval, antigua or contemporanea]\n- DOI URL: [Write the DOI URL of the paper]\n- \"I hope you find this helpful!\"\nHere is the academic paper:"
    },
    'journal': {
        prompt: "You are a blog writer specializing in the field of philosophy. You are given the titles and abstracts of an specific number or volume of an academic journal. You need to write a SEO oriented blog post about it including comments about the articles. Avoid in your response any use of special characters as * or #, so that the blog post can be easily parsed. The structure of your response should be exactly as follows so I can parse it and store it in a database:\n- \"This is the article I wrote for you:\"\n- Title: [ASHF Vol.x, N.x, YYYY]\n- Blog post: [Content of the blog post. Three paragraphs long]\n- Important fragment: [Choose one important fragment from the blog post and extract it literally]\n- Keywords: [Write 5 SEO optimized keywords that are present in the blog post.]\n- DOI URL: [https://revistas.ucm.es/index.php/ASHF/issue/archive]\n- \"I hope you find this helpful!\"\nHere are the titles and abstracts of the articles:"
    },
    'intro': {
        prompt: "You are a blog writer specializing in the field of philosophy. You are given an academic paper. Your role is to translate 3/4 of its introduction into english; that is the content of the blog post. Its title has to be a striking phrase from the paper. It has to be SEO optimized. Avoid in your response any use of special characters as * or #, so that the blog post can be easily parsed. The structure of your response should be exactly as follows so I can parse it and store it in a database:\n- \"This is the article I wrote for you:\"\n- Title: [Title of the blog post]\n- Blog post: [Content of the blog post. Three paragraphs long]\n- Important fragment: [leave blank]\n- Keywords: [Write 5 SEO optimized keywords that are present in the blog post. One of them has to be either moderna, medieval, antigua or contemporanea]\n- DOI URL: [Write the DOI URL of the paper]\n- \"I hope you find this helpful!\"\nHere is the academic paper:"
    }
} as const;

export async function POST(req: Request) {
    const { searchParams } = new URL(req.url);
    const promptKey = searchParams.get('promptKey');

    if (!promptKey || !['paper', 'journal', 'intro'].includes(promptKey)) {
        return new Response('Invalid promptKey', { status: 400 });
    }

    const dataReceived = await req.json();
    const prompt = prompts[promptKey as keyof typeof prompts].prompt + '\n' + dataReceived;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.7,
        max_tokens: 1500
    });

    console.log("🚀🚀🚀 response", response.choices[0].message.content);
    
    // Parse the content into structured data
    const content = response.choices[0].message.content;

    if (!content) {
        return new Response('No content', { status: 400 });
    }
    
    // Extract each section using regex patterns
    const titleMatch = content.match(/Title:\s*([\s\S]*?)(?=Blog post:|$)/i);
    const blogPostMatch = content.match(/Blog post:\s*([\s\S]*?)(?=Important fragment:|$)/i);
    const importantFragmentMatch = content.match(/Important fragment:\s*([\s\S]*?)(?=Keywords:|$)/i);
    const keywordsMatch = content.match(/Keywords:\s*([\s\S]*?)(?=DOI URL:|$)/i);
    const doiUrlMatch = content.match(/DOI URL:\s*([\s\S]*?)(?=I hope you find this helpful!|$)/i);
    
    // Create structured response
    const structuredResponse = {
        title: titleMatch ? titleMatch[1].trim() : '',
        blogPost: blogPostMatch ? blogPostMatch[1].trim() : '',
        importantFragment: importantFragmentMatch ? importantFragmentMatch[1].trim() : '',
        keywords: keywordsMatch ? 
            keywordsMatch[1].trim().split('\n')
                .map((k: string) => k.replace(/^\d+\.\s+/, '').trim())
                .filter((k: string) => k) : [],
        doiUrl: doiUrlMatch ? doiUrlMatch[1].trim() : ''
    };

    return Response.json(structuredResponse);
}
