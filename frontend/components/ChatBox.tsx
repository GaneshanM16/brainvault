'use client'

import { useState, useEffect, useRef } from 'react'
import { askQuestion } from '@/services/api'

interface Message {
role: 'user' | 'assistant'
text: string
sources?: string[]
}

export default function ChatBox() {

const [question, setQuestion] =
useState('')

const [loading, setLoading] =
useState(false)

const [messages, setMessages] =
useState<Message[]>([])

const scrollRef =
useRef<HTMLDivElement>(null)

useEffect(() => {


if (scrollRef.current) {

  scrollRef.current.scrollTo({

    top:
      scrollRef.current.scrollHeight,

    behavior:
      'smooth'

  })

}


}, [


messages,

loading


])

async function ask() {


if (

  !question.trim()

  ||

  loading

)

  return


const currentQuestion =
  question


setQuestion('')


setMessages(

  prev => [

    ...prev,

    {

      role:
        'user',

      text:
        currentQuestion

    }

  ]

)


setLoading(true)


try {

  const result =

    await askQuestion(

      currentQuestion

    )


  setMessages(

    prev => [

      ...prev,

      {

        role:
          'assistant',

        text:

          result.answer

          ||

          'No response generated.',

        sources:

          result.sources

          ||

          []

      }

    ]

  )

}

catch {

  setMessages(

    prev => [

      ...prev,

      {

        role:
          'assistant',

        text:
          'Something went wrong.'

      }

    ]

  )

}

finally {

  setLoading(false)

}


}

return (


<div className="space-y-5">

  <div

    ref={scrollRef}

    className="

    h-[600px]

    overflow-y-auto

    rounded-3xl

    border

    bg-zinc-50

    p-6

    shadow-sm

    space-y-6

    "

  >

    {

      messages.length === 0 && (

        <div

          className="

          text-center

          text-zinc-500

          mt-20

          "

        >

          Upload a document and start chatting

        </div>

      )

    }

    {

      messages.map(

        (

          message,

          index

        ) => (

          <div

            key={index}

            className={

              `flex ${

                message.role

                ===

                'user'

                  ?

                  'justify-end'

                  :

                  'justify-start'

              }`

            }

          >

            <div

              className={

                `

                max-w-[80%]

                rounded-3xl

                px-6

                py-4

                leading-7

                ${

                  message.role

                  ===

                  'user'

                    ?

                    'bg-blue-600 text-white'

                    :

                    'bg-white text-black border shadow-sm'

                }

                `

              }

            >

              <p>

                {

                  message.text

                }

              </p>

              {

                message.sources

                &&

                message.sources.length > 0

                && (

                  <div

                    className="

                    mt-5

                    border-t

                    pt-3

                    "

                  >

                    <div

                      className="

                      text-xs

                      text-zinc-500

                      font-semibold

                      mb-2

                      "

                    >

                      Sources

                    </div>

                    {

                      message.sources.map(

                        (

                          source,

                          idx

                        ) => (

                          <div

                            key={idx}

                            className="

                            text-sm

                            text-zinc-600

                            mb-1

                            "

                          >

                            • {source}

                          </div>

                        )

                      )

                    }

                  </div>

                )

              }

            </div>

          </div>

        )

      )

    }

    {

      loading && (

        <div

          className="

          bg-white

          border

          rounded-3xl

          p-4

          w-fit

          "

        >

          🤖 Thinking...

        </div>

      )

    }

  </div>

  <div className="flex gap-3">

    <input

      value={question}

      disabled={loading}

      onChange={

        e =>

          setQuestion(

            e.target.value

          )

      }

      onKeyDown={

        e => {

          if (

            e.key

            ===

            'Enter'

          ) {

            ask()

          }

        }

      }

      placeholder="Ask BrainVault..."

      className="

      flex-1

      rounded-2xl

      border

      bg-white

      p-4

      outline-none

      focus:ring-2

      focus:ring-blue-500

      "

    />

    <button

      onClick={ask}

      disabled={loading}

      className="

      rounded-2xl

      bg-blue-600

      px-8

      text-white

      hover:bg-blue-700

      disabled:opacity-50

      "

    >

      Ask

    </button>

  </div>

</div>


)

}
