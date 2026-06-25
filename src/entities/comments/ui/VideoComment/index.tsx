"use client";

import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { Accordion, Svg, Text } from "@/shared/ui";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { getRepliesCommentsById } from "@/shared/api/comments/getRepliesCommentsById";
import { handleLikeComment } from "../../lib/handleLikeComment";
import { handleDislikeComment } from "../../lib/handleDislikeComment";
import { handleCancel } from "../../lib/handleCanel";
import { handleReplayComment } from "../../lib/handleReplayComment";
import styles from "./styles.module.scss";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { CreateCommentUnauthPopover } from "@/shared/ui/Popover/Popovers/CreateCommentUnauthPopover";

export interface IComment {
  id: string;
  text: string;
  likes: number;
  dislikes: number;
  datePublication: string;
  parentCommentId: string;
  isLiked: boolean;
  isDisliked: boolean;
  channel: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  repliesCount: number;
}

export interface ICommentCard {
  comment: IComment;
  videoId: string;
  me: any;
  refreshCommentsList?: any;
}

export const CommentCard: React.FC<ICommentCard> = ({
  comment,
  videoId,
  me,
  refreshCommentsList
}) => {
  const {
    id,
    text,
    likes,
    dislikes,
    datePublication,
    parentCommentId,
    channel,
    repliesCount,
    isLiked,
    isDisliked,
  } = comment;
  
  const [isLikedMe, setIsLiked] = useState(isLiked);
  const [isDislikedMe, setIsDisliked] = useState(isDisliked);
  const [likesCount, setLikesCount] = useState(likes);
  const [dislikesCount, setDislikesCount] = useState(dislikes);
  const [showReplies, setShowReplies] = useState(false);
  const [relatedComments, setRelatedComments] = useState<IComment[]>([]);
  const [isEmojiesOpened, setIsEmojiesOpened] = useState<boolean>(false);
  const [isOpenedReplayInput, setIsOpenedReplayInput] = useState<boolean>(false);
  const [isOpenedUnauthPopover, setIsOpenedUnauthPopover] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowReplies = async () => {
    // const res = await getCommentsByVideoHash('sadfasdf')
    const res = await getRepliesCommentsById(id, me?.id);
    setRelatedComments(res.comments);
    setShowReplies(true);
  };

  const handleAddEmoji = async (e: EmojiClickData) => {
    inputRef.current!.value += e.emoji
  }

  const handleOpenReplyInput = () => {
    console.log('me = ', me);
    
    if ('id' in me) {
      setIsOpenedReplayInput((prev: boolean) => !prev)
    } else {
      setIsOpenedUnauthPopover(true)
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.comment_avatar}>
        <img
          src={channel.avatarUrl || "/defaultImages/defaultAvatar.png"}
          alt={channel.username}
        />
      </div>

      <div className={styles.comment_content}>
        <div className={styles.comment_header}>
          <Text className={styles.comment_username} weight={600}>
            {channel.username}
          </Text>
          <Text size={12} color="var(--grayText)">
            {formatDate(datePublication)}
          </Text>
        </div>

        <div className={styles.comment_text}>
          <Text>{text}</Text>
        </div>

        <div className={styles.comment_actions}>
          <button
            className={`${styles.action_btn} ${isLikedMe ? styles.active : ""}`}
            onClick={() =>
              handleLikeComment(
                isLikedMe,
                me?.id,
                comment.id,
                setLikesCount,
                setDislikesCount,
                setIsLiked,
                setIsDisliked
              )
            }
          >
            {isLikedMe ? <Svg name="filledLike" /> : <Svg name="like" />}
            <Text size={12} className={styles.action_btn_text}>
              {formatViews(likesCount)}
            </Text>
          </button>

          <button
            className={`${styles.action_btn} ${
              isDislikedMe ? styles.active : ""
            }`}
            onClick={() =>
              handleDislikeComment(
                isDislikedMe,
                me?.id,
                comment.id,
                setDislikesCount,
                setLikesCount,
                setIsDisliked,
                setIsLiked
              )
            }
          >
            {isDislikedMe ? (
              <Svg name="filledDislike" />
            ) : (
              <Svg name="dislike" />
            )}
            <Text size={12} className={styles.action_btn_text}>
              {formatViews(dislikesCount)}
            </Text>
          </button>

          <button
            className={styles.reply_btn}
            onClick={() => handleOpenReplyInput()}
          >
            <Text size={14} weight={500}>
              Ответить
            </Text>
          </button>

          <CreateCommentUnauthPopover isOpen={isOpenedUnauthPopover} onClose={() => setIsOpenedUnauthPopover(false)} offset={30}/>
        </div>

        {isOpenedReplayInput && (
          <div className={styles.container}>
            <img
              src={me?.avatarUrl ?? "defaultImages/defaultAvatar.png"}
              className={styles.headerAvatar}
              alt=""
            />
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Введите комментарий"
                className={styles.input}
                onChange={(e) => (inputRef.current!.value = e.target.value)}
                ref={inputRef}
              />
              <div className={styles.actions}>
                            <div className={styles.emojiContainer}>
              <img 
                src={'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f601.png'} 
                alt="emoji" 
                className={styles.emojiBtn}
                onClick={() => setIsEmojiesOpened(prev => !prev)}
              />
              <div className={styles.emojiPanel}>
                <EmojiPicker
                  onEmojiClick={(emojiObject) => handleAddEmoji(emojiObject)} 
                  lazyLoadEmojis
                  open={isEmojiesOpened}
                />
              </div>
              
            </div>
                <div className={styles.actions_btns}>
                  <button
                    onClick={() =>
                      handleCancel(setIsOpenedReplayInput, inputRef)
                    }
                    className={styles.actions_btns_1}
                  >
                    <Text>Отмена</Text>
                  </button>
                  <button
                    onClick={() =>
                      handleReplayComment(
                        inputRef.current?.value,
                        videoId,
                        me?.id,
                        id,
                        setIsOpenedReplayInput,
                        inputRef,
                        refreshCommentsList
                      )
                    }
                    className={styles.actions_btns_2}
                  >
                    <Text color="var(--whiteText)">Ответить</Text>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {repliesCount > 0 && (
          <Accordion
            header={
              !showReplies && (
                <button
                  className={styles.show_replies_btn}
                  onClick={() => handleShowReplies()}
                >
                  <Text size={14}>
                    {`${formatViews(repliesCount)} ответ${
                      repliesCount % 10 === 1 && repliesCount !== 11 ? "" : "ов"
                    }`}
                  </Text>
                  <Svg name="shortArrowDown" />
                </button>
              )
            }
            footer={
              <button
                className={styles.show_replies_btn}
                onClick={() => setShowReplies(false)}
              >
                <Text size={14}>Скрыть ответы</Text>
                <Svg name="shortArrowUp" />
              </button>
            }
          >
            <div className={styles.comments_comments}>
              {relatedComments.map((comment: IComment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  videoId={videoId}
                  me={me}
                  refreshCommentsList={refreshCommentsList}
                />
              ))}
            </div>
          </Accordion>
        )}
      </div>
    </div>
  );
};
