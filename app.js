const express = require('express')
const bodyParser = require('body-parser')
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express()
 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
app.post('/', async (req, res) => {
    let data = req.body;
    let prompt = JSON.stringify(data)

    let result = ""

    try {
        result = await run(prompt)

        console.log(result)
    }
    catch (error) {
        console.log(error)
    }

    res.send('Data Received: ' + result);
})
 
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})