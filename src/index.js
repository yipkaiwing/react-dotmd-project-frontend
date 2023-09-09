import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, redirect,  RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import ViewPage from './ViewPage';
import CreatePage from './CreatePage';
import EditPage from './EditPage';

const api = 'http://localhost:3001/notes/';


// using creatBrowserRouter to create a config file
// no need to make the master layout Root
const router = createBrowserRouter([

  {
    path: '/',
    element: <HomePage />,
    loader: async () => {
      const response = await fetch(api); 
      // console.log(response); // the body of response is ReadableStream, cannot be used directly, we need to decode it
      const json = await response.json(); // decode the body of response
      // console.log(json); // the body of response is an array of objects (notes)
      return { 
        notes: json
      }; // return the array of objects (notes) to the HomePage
    } 
  },
  {
    path: '/view/:id',
    element: <ViewPage /> ,
    loader: async ({ params }) => {
      const id = +params.id;  // convert params.id to a number

      // Load all notes from the API
      const notesResponse = await fetch(api);
      const notes = await notesResponse.json();

      // Load a specific note from the API
      // const response = await fetch(`${api}${id}`);
      const noteResponse = await fetch(api + id); // the same as the above line  
      const note = await noteResponse.json();

      return {
        id: id,
        notes: notes,
        note: note,
      }
    },
  },
  {
    path: '/create/',
    element: <CreatePage />,
    action: async ({ request }) => {
      // call the new post API....
      const formData = await request.formData();
      const title = formData.get('title');
      const content = formData.get('content');
      // console.log('title:', title);
      // console.log('content:', content);
      // send to the new note API endpoints
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          datetime: new Date().toISOString(),
        }),
      });
      // no need to pass the id to the API, the API will generate the id for us
      const json = await response.json();
      // console.log('json:', json);

      // redirect to the view page of the new note
      return redirect(`/view/${json.id}`);
    },
  },
  // the most difficult part is Edit as it includes boith view and create pages (loader and action)
  {
    path: '/edit/:id',
    element: <EditPage />,
    loader: async ({ params }) => {
      const id = +params.id;  // convert params.id to a number

      // Load all notes from the API
      // const notesResponse = await fetch(api);
      // const notes = await notesResponse.json();

      // Load a specific note from the API
      // const response = await fetch(`${api}${id}`);
      const noteResponse = await fetch(api + id); // the same as the above line  
      const note = await noteResponse.json();

      return {
        // id: id,
        // notes: notes,  
        note: note,
      };
    },
    action: async ({ request, params }) => {  //params is used for getting the id, while request is used for create/edit data
      const id = +params.id;  // convert params.id to a number
      // console.log("id:", id);
      // console.log("params:", params);
      // console.log("request:", request);
      // console.log("request.formData():", request.formData());

      // call the new post API....
      const formData = await request.formData();
      const title = formData.get('title');
      const content = formData.get('content');
      // console.log('title:', title);
      // console.log('content:', content);
      // call the update API ....
      const response = await fetch(api + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          datetime: new Date().toISOString(),
        }),
      });
      // no need to pass the id to the API, the API will generate the id for us
      const json = await response.json();
      // console.log('json:', json);

      // redirect to the view page of the new note
      return redirect(`/view/${json.id}`);
    }
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);


