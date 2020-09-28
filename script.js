$("input").bind("input", function() {  sendNewRequest(input.value)  })
$("body").bind("click", function() {  $("#prompt_field").empty()  })
$("button").bind("click", function() {  input.value = ""  })

/*
input.addEventListener("input", () => {  sendNewRequest(input.value)  });
document.body.addEventListener("click", () => {  prompt_field.innerHTML = "";  });
*/

function sendNewRequest(text) {
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "9a5aa19f9dfef540c349066f2d3386f69c987ef8";
    let query = text;

    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query, count: 12})
    }

    fetch(url, options)
    .then(response => response.json())
    .then(result => {
        let resultOfRequest = result.suggestions.map(suggestion => suggestion.value);
        createPromptField(resultOfRequest);
    })
}

function createPromptField(prompts) {
    $("#prompt_field").empty();
    prompts.forEach(prompt => {
        let elementOfField = $('<div class="prompt"></div>')
            .text(prompt)
            .bind("click", function() {  input.value = elementOfField.text()  })

        $("#prompt_field").append(elementOfField)
        
/*      let elementOfField = document.createElement("div");
        elementOfField.classList.add("prompt");
        elementOfField.innerText = prompt;
        elementOfField.addEventListener("click", () => {  input.value = elementOfField.innerText  });
        prompt_field.append(elementOfField);        */
    })
}