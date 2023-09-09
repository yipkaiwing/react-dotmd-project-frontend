// rafce
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import NoteList from './NoteList';
import Navbar from './Component/Navbar';

const HomePage = () => {

  const loaderData = useLoaderData();

  return (
    <>
      <Navbar />

      {/* Below the nav bar, divide the page into 2 section
      the left hand side is the Note list while
      the right hand side is the Note content */}

      <div className="container mx-auto mt-6 flex">

      {/* the left hand side: Note List */}
        <div className="w-1/2 md:w-1/3 pr-2">
          <NoteList
            notes={loaderData.notes}
            previewlength={10}
          />
        </div>

      {/* The right hand side */}
      <div className=" w-1/2 md:w-2/3 px-4 text-md">
        Please select a note from the sidebar or create a new note.
      </div>
    </div>
  </>
  );
}

export default HomePage