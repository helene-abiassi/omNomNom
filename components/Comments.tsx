import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
// import React from "react";
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "../style/Comments.css";
import AuthContext from "../context/AuthContext";

interface CommentsType {
  author: string;
  message: string;
  date: Timestamp | Date;
}

function Comments() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentsType[] | null>(null);
  const [newComment, setNewComment] = useState("");

  const getComments = async () => {
    const querySnapshot = await getDocs(collection(db, "comments"));

    const commentsArray: CommentsType[] = [];
    querySnapshot.forEach((doc) => {
      console.log("docDATA :>> ", doc.data());
      console.log(`${doc.id} => ${doc.data()}`);
      commentsArray.push(doc.data() as CommentsType);
    });
    setComments(commentsArray);
  };

  const formatDate = (date: Timestamp | Date): string => {
    if (date instanceof Timestamp) {
      const formattedDate = new Date(date.seconds * 1000).toLocaleString();
      return formattedDate;
    } else {
      const formattedDate = new Date(date.seconds * 1000).toLocaleString();
      return formattedDate;
    }
    // console.log("formattedDate :>> ", formattedDate);
  };

  const handleNewComments = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    console.log("newComment", newComment);

    const newCommentPost: CommentsType = {
      author: user!.email!,
      message: newComment,
      date: new Date(),
    };
    // console.log("newCommentPost :>> ", newCommentPost);
    const docRef = await addDoc(collection(db, "comments"), newCommentPost);
    console.log("Document written with ID: ", docRef.id);
  };

  const getRealTimeComments = () => {
    const q = query(collection(db, "comments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray: CommentsType[] = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push(doc.data() as CommentsType);
      });
      //   console.log("Current cities in CA: ", commentsArray);
      setComments(commentsArray);
    });
  };

  useEffect(() => {
    // getComments();
    getRealTimeComments();
  }, []);

  return (
    <div className="commentsSection">
      <div className="newComment">
        <input onChange={handleNewComments} type="text" />
        <button onClick={submitComment}>Post</button>
      </div>

      {comments &&
        comments.map((comment, commentIndex) => {
          return (
            <div className="singleComment" key={commentIndex}>
              <p>{comment.author}</p>
              <p>{comment.message}</p>
              <p>{formatDate(comment.date)}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Comments;
