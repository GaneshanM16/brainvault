'use client'

import { useState } from 'react'

import {

uploadFile

}

from '@/services/api'

export default function UploadBox(){

const [

loading,

setLoading

]=

useState(false)

const [

uploaded,

setUploaded

]=

useState(false)

async function upload(

e:

React.ChangeEvent<

HTMLInputElement

>

){

if(!e.target.files)

return

const file=

e.target.files[0]

if(

!file

)

return

if(

file.type

!==

"application/pdf"

){

alert(

"Upload PDF only"

)

return

}

try{

setLoading(

true

)

await uploadFile(

file

)

setUploaded(

true

)

}

catch{

alert(

"Upload failed"

)

}

finally{

setLoading(

false

)

}

}

return (
    <div className="rounded-2xl border border-dashed p-10 text-center transition">
      <label className="cursor-pointer block">
        <div className="text-xl">🧠</div>
        <div className="mt-4">
          {loading ? "Processing..." : uploaded ? "Knowledge Stored" : "Upload Document"}
        </div>
        <div className="mt-2 text-sm opacity-70">PDF only</div>
        <input hidden type="file" accept=".pdf" disabled={loading} onChange={upload} />
      </label>
      {loading && (
        <div className="mt-4 animate-pulse">Embedding document...</div>
      )}
    </div>
  )

}
