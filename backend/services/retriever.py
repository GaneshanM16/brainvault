from services.embedder import (

collection,
model

)


def retrieve(

query,

k=5

):


    vector = (

        model.encode(

            query

        )

    )


    results = (

        collection.query(

            query_embeddings=[

                vector.tolist()

            ],

            n_results=k

        )

    )


    return (

        results[

            "documents"

        ][0]

    )