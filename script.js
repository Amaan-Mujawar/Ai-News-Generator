const input = document.getElementById("input");

async function getNews() {
    const topic = input.value.trim() || "latest news"; // If no input, use 'latest news'

    const API_KEY = "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";
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: "Generate news on topic " + topic + " in div tag with CSS, no HTML or body tag",
                },
            ],
        }),
    });

    const body = await response.json();
    console.log(body);
    const newDiv = document.createElement('div');
    newDiv.innerHTML = body.choices[0].message.content;
    document.getElementById('result').innerHTML = "";
    document.getElementById('result').appendChild(newDiv);
}

function clearInput() {
    input.value = "";
}

function clearResult() {
    document.getElementById('result').innerHTML = "";
}

function copyNews() {
    const resultText = document.getElementById('result').innerText;
    if (!resultText) {
        alert("No news to copy!");
        return;
    }
    navigator.clipboard.writeText(resultText).then(() => {
        alert("News copied to clipboard!");
    });
}

function refreshPage() {
    location.reload();
}
