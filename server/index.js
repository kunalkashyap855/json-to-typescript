const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const configuration = new Configuration({
    apiKey: "YOUR API KEY"
});

const openai = new OpenAIApi(configuration);

app.get("/api", (req, res) => {
    res.json({
        message: "Hello World!"
    });
});

app.post("/covert", async (req, res) => {
    let { value } = req.body;

    const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;

    const completion  = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "prompt" }],
    });
    console.log(completion)
    res.json({
        message: "Successfull",
        response: completion.data.choices[0].message.content,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
