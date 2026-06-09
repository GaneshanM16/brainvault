import os

from groq import Groq

from dotenv import load_dotenv


load_dotenv()


GROQ_API_KEY = os.getenv(

"GROQ_API_KEY"

)

print(

"Loaded:",

bool(

GROQ_API_KEY

)

)


client = Groq(

api_key=

GROQ_API_KEY

)


def ask_llm(

question,

context

):


    prompt = f"""

You are BrainVault.

Answer ONLY from context.

If context is insufficient:

say:

"I couldn't find enough information."

Explain naturally.

Context:

{context}

Question:

{question}

"""


    response = (

        client.chat.completions.create(

            model=

            "llama-3.1-8b-instant",

            messages=[

                {

                    "role":"user",

                    "content":prompt

                }

            ]

        )

    )


    return (

        response

        .choices[0]

        .message

        .content

    )