import React, { useEffect, useState } from "react";
import FirebaseIface from "./firebaseIface";
import "./Stories.css";

export const Stories = ({
  firebaseIface
}: {
  firebaseIface: FirebaseIface;
}) => {
  const [stories, setStories] = useState<Record<string, any>[]>([]);

  const storiesChanged = (newStories: Record<string, any>[]) => {
    setStories(newStories);
  };

  useEffect(() => {
    if (stories.length === 0) {
      firebaseIface.subscribeStories(storiesChanged);
    }
  });

  const renderedStories = stories.map((u) => (
    <div className="story-details" key={u.id}>
      <div>id: {u.id}, </div>
      <div>subject: {u.subject}, </div>
      <div>body: {u.body}, </div>
      <div>date: {u.date}</div>
    </div>
  ));

  return (
    <>
      <h1>Storia</h1>
      <div className="menu">
        <button onClick={() => firebaseIface.addStory()}>Add story</button>
        {/* <button onClick={() => firebaseIface.getStories()}>Get stories</button> */}
      </div>

      <div className="stories">{renderedStories}</div>
    </>
  );
};
