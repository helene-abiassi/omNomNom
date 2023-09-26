import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
// import React from "react";
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "../style/Comments.css";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

interface CommentsType {
  author: string;
  message: string;
  date: Timestamp | Date;
  id?: string;
}
// potential TS solution for comments with ID and without : one interface(or maybe Type alias) that extends from another one
function Comments() {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentsType[] | null>(null);
  const [newComment, setNewComment] = useState("");

  const { recipeId } = useParams();

  const getComments = async () => {
    const querySnapshot = await getDocs(collection(db, `${recipeId}`));

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
    // const docRef = await addDoc(collection(db, "comments"), newCommentPost);
    const docRef = await addDoc(collection(db, `${recipeId}`), newCommentPost);
    console.log("Document written with ID: ", docRef.id);
  };

  const getRealTimeComments = () => {
    const q = query(collection(db, "comments"), orderBy("date", "desc"));
    // const q = query(collection(db, "71406"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray: CommentsType[] = [];
      querySnapshot.forEach((doc) => {
        console.log("doc :>> ", doc.id);
        const message = { ...doc.data(), id: doc.id } as CommentsType; // be careful with the use of type assertion (ok, this time was me...)
        console.log("my new message :>> ", message);
        commentsArray.push(message);
      });
      setComments(commentsArray);
      console.log("commentsArray :>> ", commentsArray);
    });
  };

  const deleteComment = async (commentId) => {
    const commentsArray: CommentsType[] = [];
    console.log("commentId :>> ", commentId);
    try {
      // const commentId = e.target.id;
      console.log("delete msgs", commentId);
      const deletedMeesage = await deleteDoc(doc(db, "comments", commentId));
      console.log("successfull :>> ", deletedMeesage);
    } catch (error) {
      console.log("error", error);
    }
    // setComments(commentsArray);
  };

  useEffect(() => {
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
              {/* <button onClick={deleteComments}>Delete</button> */}
              {user?.email === comment.author && (
                <button onClick={() => deleteComment(comment.id)}>
                  Delete
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Comments;
