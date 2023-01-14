# Use the API key to create a client
import openai
api_key = "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"
openai.api_key = api_key

# import flask and CORS
from flask import Flask, request
from flask_cors import cross_origin
app = Flask(__name__)

@app.route("/ask")
@cross_origin()

def ask():
  
  completions = openai.Completion.create(
    engine="text-davinci-003",
    prompt=request.args['q'],
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
  )

  message = completions.choices[0].text
  return {"answers": message}

if __name__ == "__main__":
  app.run(debug= True)




# Use the client to generate a response to a user's input
prompt = "What is the weather like in New York City?"
response = openai.Completion.create(engine="text-davinci-002", prompt=prompt)

# Print the response
print(response["choices"][0]["text"])
