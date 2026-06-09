import UploadBox from

"@/components/UploadBox"

import ChatBox from

"@/components/ChatBox"


export default function Home(){

return(

<div
className=

"max-w-5xl mx-auto p-10"

>

<h1
className=

"text-5xl font-bold"

>

🧠 BrainVault

</h1>


<p>

Your AI Second Brain

</p>


<div
className=

"my-8"

>

<UploadBox/>

</div>


<ChatBox/>


</div>

)

}