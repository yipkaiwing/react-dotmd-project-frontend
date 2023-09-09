// rafce
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { marked } from 'marked'
import NoteList from './NoteList';
import Navbar from "./Component/Navbar";

const ViewPage = () => {
  const loaderData = useLoaderData();

  return (
    <>
      <Navbar />

      {/* Below the nav bar, divide the page into 2 section
      the left hand side is the Note list while
      the right hand side is the Note content */}

      {/* the left hand side: Note List */}
      <div className="container mx-auto mt-6 flex">
        <div className=" w-1/2 md:w-1/3 pr-2">
          <NoteList
            notes={loaderData.notes}
            activeId={loaderData.note.id}
            previewlength={20}
          />
        </div>

      {/* The right hand side: detailed page of the Note */}
      <div className=" w-1/2 md:w-2/3 px-4 text-md">
        <h2 className=" text-lg font-semibold">
          {loaderData.note.title}
        </h2>
        <hr className="my-4"/>

        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html: marked(loaderData.note.content),
          }}
        >
        </div>

        <div className="mt-4 text-sm">
          <Link to={`/edit/${loaderData.note.id}`} className=" text-slate-400">
            [Edit]
          </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default ViewPage;
