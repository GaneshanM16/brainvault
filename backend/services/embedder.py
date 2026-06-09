from sentence_transformers import (

SentenceTransformer

)

import chromadb


model = (

SentenceTransformer(

"all-MiniLM-L6-v2"

)

)

client = (

chromadb.PersistentClient(

path="vectordb"

)

)

collection = (

client.get_or_create_collection(

"brainvault"

)

)


def store_chunks(

chunks

):


    vectors = (

        model.encode(

            chunks

        )

    )


    for i, chunk in enumerate(chunks):


        collection.add(

            ids=[

                str(i)

            ],

            documents=[

                chunk

            ],

            embeddings=[

                vectors[

                    i

                ].tolist()

            ]

        )