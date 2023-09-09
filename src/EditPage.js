import React from 'react'
import { Link, useLoaderData, Form } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { marked } from 'marked'

const EditPage = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const loaderData = useLoaderData();

  const api = 'http://localhost:3001/notes/';

  useEffect(() => {
    setTitle(loaderData.note.title);
    setContent(loaderData.note.content);
  }, [loaderData]);

  // Suggested by AI
  const handleDelete = (e) => {
    e.preventDefault(); // cancel the fucntion of the button
    // ask the user to confiorm delete or not 
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    fetch(`${api}/${loaderData.note.id}`, {
      method: 'DELETE',
    }).then(() => {
      window.location.href = '/';
    });
  }


  // Steven Sir not working cnnnot router to default home page
  // const handleDelete = (e) => {
  //   e.preventDefault(); // cancel the fucntion of the button

  //   // Ask for confirm to delete or not
  //   if (!window.confirm('Are you sure you want to delete this note?')) {
  //     return;
  //   }

  //   // call the delete API
  //   const api = 'http://localhost:3001/notes/'
  //   const response = fetch(`${api}/${loaderData.note.id}`, {
  //     method: 'DELETE',
  //     });
  //   if (response.ok) {
  //     window.location.href = '/';
  //   }
  // };

  return (
    <Form action={`/edit/${loaderData.note.id}`} method='post' >
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
            Update
          </button>
        </div>
      </nav>

      {/* main content */}
      <div className='container mx-auto mt-6 flex'>

      {/* the input form in the left hand side */}
      <div className='w-1/2 md:w-2/3 mr-4 text-md'>
        <input
          type='text'
          className="w-full border px-3 py-2 rounded border-slate-400"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // for the state value
          name= 'title' // for const title = formData.get('title');
        />
        <hr className='my-4' />
        <textarea 
          className='w-full h-96 border px-3 py-2 rounded border-slate-400'
          value={content}
          onChange={(e) => setContent(e.target.value)} // for the state value
          name='content' // for const content = formData.get('content');
        >
        </textarea>

        {/* Add the delete button */}
        <button 
          className=' bg-red-500 text-white rounded px-4 py-2 mt-5'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* the rihgt hand side: detailed page of the Note */}
      <div className='w-1/2 md:w-2/3 px-4 text-md'>
        <h2 className='text-lg font-semibold py-2'>
          {title}
        </h2>
        <hr className='my-4' />
          
          <div dangerouslySetInnerHTML={{
            __html: marked.parse(content),
          }}>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default EditPage