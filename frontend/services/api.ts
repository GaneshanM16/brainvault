const API =

"http://127.0.0.1:8000"



export async function uploadFile(

file: File

){

const form=

new FormData()

form.append(

"file",

file

)


const response=

await fetch(

`${API}/upload`,

{

method:

"POST",

body:

form

}

)


return (

response

.json()

)

}



export async function askQuestion(

question:string

){

const response=

await fetch(

`${API}/ask`,

{

method:

"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

question

})

}

)


return (

response

.json()

)

}