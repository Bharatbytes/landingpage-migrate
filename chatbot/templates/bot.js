// Replace with your actual API key
const apiKey = "OPENAI_APIKEY"


document.getElementById("send-button").addEventListener("click", sendMessage);
document
  .getElementById("message-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message === "") {
    alert("Please enter a message.");
    return;
  }

  // Clear the input field after sending the message
  messageInput.value = "";

  // Display user's message in the chat box
  displayMessage("", message);

  //     // Send the message to the Flask API
      fetch('https://api.openai.com/v1/chat/completions', { //open api
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are an intelligent assistant." },
              { role: "user", content: message },
            ],
            max_tokens: 150,
          })
      })
      .then(response => response.json())
      .then(data => {
          if (data.choices && data.choices.length > 0) {
              displayMessage('', data.choices[0].message.content);
          } else {
              displayMessage('Error', 'Failed to get a response from the server.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          displayMessage('Error', 'An error occurred while contacting the server.');
      });
  }

  function displayMessage(sender, message) {
      const chatBox = document.getElementById('chat-box');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
      messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatBox.appendChild(messageElement);

      // Auto scroll to the bottom of the chat box
      chatBox.scrollTop = chatBox.scrollHeight;
  }

  

