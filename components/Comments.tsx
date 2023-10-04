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
import { db } from "../config/firebaseConfig";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import "../style/Comments.css";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

export interface CommentsType {
  author: string;
  message: string;
  date: Timestamp | Date;
  id?: string;
}

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
    console.log("getComments() :>> ", getComments());
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
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    console.log("newComment", newComment);

    const newCommentPost: CommentsType = {
      author: user!.displayName!,
      message: newComment,
      date: new Date(),
    };
    const docRef = await addDoc(collection(db, `${recipeId}`), newCommentPost);
    console.log("Document written with ID: ", docRef.id);
    setNewComment("");
  };

  const getRealTimeComments = () => {
    // const q = query(collection(db, "comments"), orderBy("date", "desc"));
    const q = query(collection(db, `${recipeId}`), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsArray: CommentsType[] = [];
      querySnapshot.forEach((doc) => {
        console.log("doc :>> ", doc.id);
        const message = { ...doc.data(), id: doc.id } as CommentsType;
        // be careful with the use of type assertion (ok, this time was me...)
        console.log("my new message :>> ", message);
        commentsArray.push(message);
      });
      setComments(commentsArray);
      // console.log("commentsArray :>> ", commentsArray);
    });
  };

  const deleteComment = async (commentId: string) => {
    const commentsArray: CommentsType[] = [];
    console.log("commentId :>> ", commentId);
    try {
      if (window.confirm("Are you SURE you want to delete your comment?")) {
        const deletedMessage = await deleteDoc(
          doc(db, `${recipeId}`, commentId)
        );
        console.log("successfull :>> ", deletedMessage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getRealTimeComments();
  }, []);

  return (
    <div className="commentsSection">
      <div className="commentHeader">
        <h3 style={{ color: "white" }}>Comments:</h3>
        <span style={{ width: "300px", borderTop: "white solid 1px" }}>
          <p style={{ color: "white" }}>
            Leave a comment below and let us know what you thought of the
            recipe!
          </p>
        </span>
      </div>
      <br />
      <div className="newComment">
        <input
          className="commentInput"
          placeholder="Write a comment..."
          onChange={handleNewComments}
          type="text"
          value={newComment}
        />
        <button id="submitButton" onClick={submitComment}>
          Submit
        </button>
      </div>
      <>
        {comments ? (
          <div>
            {comments.length > 0 ? (
              comments.map((comment, commentIndex) => {
                return (
                  <div className="singleComment" key={commentIndex}>
                    <div className="singleCommentHeader">
                      <h4>{comment.author}</h4>

                      <p style={{ color: "white" }}>
                        {formatDate(comment.date)}
                      </p>
                    </div>
                    <div className="commentBody">
                      <p className="commentMsg">{comment.message}</p>
                      {user?.displayName === comment.author && (
                        <button
                          id="deleteButton"
                          onClick={() => deleteComment(comment.id as string)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <p style={{ color: "black" }}>
                  Be the first one to leave a comment!
                </p>
                <br />
              </>
            )}
          </div>
        ) : null}
      </>
    </div>
  );
}

export default Comments;
