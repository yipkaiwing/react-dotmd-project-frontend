// rafce
import React from 'react'
import { Link, Form, useActionData } from 'react-router-dom'
import { useState } from 'react'
import { marked } from 'marked'

// We use Form-recat router approach to create a new note rather than fetch post method


const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const actionData = useActionData();
  console.log("actionData:", actionData);

  return (
    <Form action='/create' method='post' >
      {/* navbar   */}
      <nav className='bg-slate-800 py-2' >
        <div className='container mx-auto flex items-center justify-between'>
          <Link to="/" className='text-2xl font-bold text-white'>
            dotMD
          </Link>
          <button
            type='submit'
            className='text-md text-slate-800 bg-white rounded inline-block px-3 py-1 hover:bg-slate-200'
          >
            Create
          </button>
        </div>
      </nav>

      {/* main content */}
      <div className='container mx-auto mt-6 flex'>

      {/* the input form n the left hand side */}
      <div className='w-1/2 md:w-2/3 mr-4 text-md'>
        <input
          type='text'
          className="w-full border px-3 py-2 rounded border-slate-400"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // for the state value
          name = 'title' // for const title = formData.get('title');
        />
        <hr className='my-4' />
        <textarea
          className='w-full h-96 border px-3 py-2 rounded border-slate-400'
          value={content}
          onChange={(e) => setContent(e.target.value)} // for the state value
          name = 'content' // for const content = formData.get('content');
        >
        </textarea>
      </div>

      {/* the rihgt hand side: detailed page of the Note */}
      <div className='w-1/2 md:w-2/3 px-4 text-md'>
        <h2 className='text-lg font-semibold py-2'>
          {title}
        </h2>
        <hr className='my-4' />

        <div
          className='markdown'
          dangerouslySetInnerHTML={{
            __html: marked.parse(content),
          }}
        ></div>
        
      </div>
     </div>
    </Form>
  )
}

export default CreatePage