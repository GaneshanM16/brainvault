from fastapi import (

FastAPI,
UploadFile,
File

)
from fastapi.middleware.cors import CORSMiddleware


from services.parser import (

extract_text

)

from services.chunker import (

chunk_text

)

from services.embedder import (

store_chunks

)


app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:3000"

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


@app.post("/upload")

async def upload(

file: UploadFile

= File(...)

):


    contents = (

        await file.read()

    )


    text = (

        extract_text(

            contents

        )

    )


    print(

        "\nTEXT:\n",

        text[:1000]

    )


    chunks = (

        chunk_text(

            text

        )

    )


    print(

        "\nCHUNKS:\n",

        chunks[:2]

    )


    store_chunks(

        chunks

    )


    return {

        "text_length":

        len(text),

        "chunks":

        len(chunks)

    }

from services.retriever import retrieve

from services.llm import ask_llm

from pydantic import BaseModel


class AskInput(

BaseModel

):

    question:str


@app.post(

"/ask"

)

def ask(

data:

AskInput

):


    docs = (

        retrieve(

            data.question

        )

    )


    answer = (

        ask_llm(

            data.question,

            "\n".join(

                docs

            )

        )

    )


    return {

        "answer":

        answer,

        "sources":

        docs

    }