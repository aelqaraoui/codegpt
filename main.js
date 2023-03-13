

async function run(prompt) {
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: prompt,
        temperature: 0,
        max_tokens: 182,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["###"],
      });

    return response
}

run()