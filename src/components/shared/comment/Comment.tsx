import classes from "./Comment.module.css";
import { videoType } from "@/types";
import { useContext, useEffect, useState } from "react";
import {
  addVideoCommentQuery,
  deleteVideoCommentQuery,
  editVideoCommentQuery,
  getVideoCommentQuery,
} from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { dateformatter } from "../card/dateformatter";
import { Link } from "react-router-dom";
import { userContext } from "@/context/Context";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

function Comment({ videoData }: { videoData: videoType }) {
  const [inputFocus, setInputFocus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { user } = useContext(userContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editInputFocus, setEditInputFocus] = useState(false);
  const { toast } = useToast();

  //comment query ->

  //get comments
  const {
    data: comments,
    isPending,
    isError,
    error,
  } = getVideoCommentQuery(videoData._id);

  // add commetns
  const {
    mutateAsync: addComment,
    
  } = addVideoCommentQuery();

  //delete comment query
  const {
    mutateAsync: deleteComment,
    data: deleteCommentStatus,
  
  } = deleteVideoCommentQuery();

  //delete comment query
  const { mutateAsync: editCommentReq} =
    editVideoCommentQuery();

  const inputFocusHandler = () => {
    setInputFocus(true);
  };
  const editInputFocusHandler = () => {
    setEditInputFocus(true);
  };
  const cancelHandler = () => {
    setInputFocus(false);
    setCommentContent("");
  };
  const commentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };
  const submitCommentHandler = () => {
    //post Comment
    addComment({ videoId: videoData._id, content: commentContent });
    setInputFocus(false);
    setCommentContent("");
  };

  //delete comment
  const deleteCommentHandler = (commentId: string) => {
    deleteComment(commentId);
  };

  //edit
  const editCancelHandler = () => {
    setEditInputFocus(false);
    setEditCommentContent("");
    setEditComment("");
  };
  const editCommentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setEditCommentContent(e.target.value);
  };
  const submitEditCommentHandler = (commentId: string) => {
    
    editCommentReq({ commentId: commentId, content: editCommentContent });
    setEditInputFocus(false);
    setEditCommentContent("");
    setEditComment("");
  };

  useEffect(() => {
    if (deleteCommentStatus) {
      toast({
        description: "comment deleted",
      });
    }
  }, [deleteCommentStatus]);

  return (
    <>
      <div className={classes.comments}>
        <div className="flex gap-10">
          {/* <h1 className="text-bold text-xl">200 Comments</h1>
          <div className="flex gap-1">
            <MdSort size={23} />
            <p>Sort by</p>
          </div> */}
        </div>

        <div className={classes.userComment}>
          {/* current logged in user img  */}
          <img src={videoData.owner_details[0].avatar} alt="remoteImage" />
          <div className="flex flex-col w-[85%] gap-2">
            <input
              onChange={commentHandler}
              onFocus={inputFocusHandler}
              value={commentContent}
              type="text"
              placeholder="Add a comment..."
              className="text-sm md:text-base"
            />
            <div className="flex gap-2 justify-end ">
              {inputFocus && (
                <>
                  <button
                    onClick={cancelHandler}
                    className="text-xs md:text-sm text-black rounded-2xl p-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2 hover:bg-gray-300 "
                  >
                    Cancel
                  </button>
                  <button
                    disabled={commentContent === ""}
                    onClick={submitCommentHandler}
                    className={`text-xs md:text-sm text-gray-500 rounded-2xl p-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2 ${
                      commentContent != ""
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    Comment
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes.commentContainer}>
          {/* comments from previous users */}
          {isPending && (
            <Oval
              visible={true}
              height="35"
              width="35"
              color="blue"
              secondaryColor="blue"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
          {isError && <p className="w-[100%] text-center">{error.message}</p>}
          {!isPending && !isError && comments.length === 0 && (
            <p className="w-[100%] text-center text-xs md:text-base">No comments</p>
          )}
          {comments &&
            comments.map((comment: any, index: number) => {
              let cd = dateformatter(comment.createdAt);
              return (
                <div key={index}>
                  {editComment === comment._id && (
                    <div className={classes.userComment}>
                      <img
                        src={comment.owner_details[0].avatar}
                        alt="remoteImage"
                      />
                      <div className="flex flex-col w-[85%] gap-2">
                        <input
                          onChange={editCommentHandler}
                          onFocus={editInputFocusHandler}
                          defaultValue={comment.content}
                          type="text"
                          className="text-sm md:text-base"
                        />
                        <div className="flex gap-4 justify-end">
                          {editInputFocus && (
                            <>
                              <button
                                onClick={editCancelHandler}
                                className="text-xs md:text-sm text-black rounded-2xl p-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2 hover:bg-gray-300 "
                              >
                                Cancel
                              </button>
                              <button
                                disabled={editCommentContent === ""}
                                onClick={() =>
                                  submitEditCommentHandler(comment._id)
                                }
                                className={`text-xs md:text-sm text-gray-500 rounded-2xl p-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2 ${
                                  editCommentContent != ""
                                    ? "bg-blue-700 text-white"
                                    : "bg-gray-100"
                                }`}
                              >
                                Comment
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {editComment != comment._id && (
                    <div className="flex ">
                      <div className="flex flex-[90%] gap-5">
                        <Link
                          to={
                            user._id === comment.owner
                              ? `/userChannel`
                              : `/channel/${comment.owner}`
                          }
                        >
                          <img
                            src={comment.owner_details[0].avatar}
                            alt="remoteImage"
                          />
                        </Link>
                        <div className={classes.peopleComments}>
                          <div className="flex gap-1">
                            <h1 className="text-sm md:text-base">{comment.owner_details[0].fullName}</h1>
                            <p className="text-xs md:text-base text-gray-600">{cd}</p>
                          </div>
                          <h1 className="text-sm md:text-base">{comment.content}</h1>

                          {/* <div className="flex gap-6">
          <div className="flex">
            <AiOutlineLike size={20} />
            <p className="text-sm text-gray-500">10</p>
          </div>
          <div className="flex"> <BiDislike size={22}/> <p className="text-sm text-gray-500">10</p></div>
          <p className="text-sm">Reply</p>
        </div> */}
                        </div>
                      </div>
                      <div className="flex-[10%]">
                        {user._id === comment.owner && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <p>
                                <HiOutlineDotsVertical />
                              </p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-30 rounded-xl">
                              <DropdownMenuRadioItem
                                value="Edit"
                                onClick={() => setEditComment(comment._id)}
                              >
                                <p className="flex gap-4">
                                  <MdOutlineEdit size={20} />
                                  Edit
                                </p>
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem
                                value="Delete"
                                onClick={() => setDeleteModal(true)}
                              >
                                <p className="flex gap-4">
                                  <RiDeleteBin6Line size={20} />
                                  Delete
                                </p>
                              </DropdownMenuRadioItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  )}
                  <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
                    <AlertDialogContent className="w-max">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Delete your comment permanently?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-blue-800 border-none hover:bg-blue-100 hover:rounded-3xl">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteCommentHandler(comment._id)}
                          className="bg-white text-blue-800 border-none hover:bg-blue-100 hover:rounded-3xl"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Comment;
