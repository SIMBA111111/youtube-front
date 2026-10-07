"use client";

import { useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { Accordion, Svg, Text } from "@/shared/ui";
import { CreateCommentUnauthPopover } from "@/shared/ui/Popover/Popovers/CreateCommentUnauthPopover";
import { formatViews } from "@/shared/utils/formatViews";
import { formatDate } from "@/shared/utils/formatDate";
import { getRepliesCommentsById, IGetRepliesCommentsByIdResponse } from "@/shared/api/comments/getRepliesCommentsById";
import { handleLikeComment } from "../../lib/handleLikeComment";
import { handleDislikeComment } from "../../lib/handleDislikeComment";
import { handleCancel } from "../../lib/handleCanel";
import { handleReplayComment } from "../../lib/handleReplayComment";

import styles from "./styles.module.scss";
import { CreatorCommentSettingPopover } from "./CreatorCommentSettingPopover";
import { ICommentFullInfo } from "../../model/types";
import { IGetCommentsByVideoId, IMapCommentStatistic } from "@/shared/api/comments/getCommentsByVideoId";
import { ICommentStatisticEntity } from "@/shared/types/commentStatisticEntity";


export interface ICreatorComment {
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

export interface ICreatorCommentCard {
  comment: ICommentFullInfo;
  commentStatistic: ICommentStatisticEntity | null;
  videoId: string;
  me: any;
  refreshData: () => void
}

export const CreatorCommentCard: React.FC<ICreatorCommentCard> = ({
  comment,
  commentStatistic,
  videoId,
  me,
  refreshData
}) => {
  const [isLikedMe, setIsLiked] = useState(commentStatistic?.liked ?? false);
  const [isDislikedMe, setIsDisliked] = useState(commentStatistic?.disliked ?? false);
  const [likesCount, setLikesCount] = useState(comment.likeCount);
  const [dislikesCount, setDislikesCount] = useState(comment.dislikeCount);
  const [showReplies, setShowReplies] = useState(false);
  const [relatedComments, setRelatedComments] = useState<IGetRepliesCommentsByIdResponse>();
  const [isEmojiesOpened, setIsEmojiesOpened] = useState<boolean>(false);
  const [isOpenedReplayInput, setIsOpenedReplayInput] = useState<boolean>(false);
  const [isOpenedUnauthPopover, setIsOpenedUnauthPopover] = useState<boolean>(false);
  const [isOpenedSettingPopover, setIsOpenedSettingPopover] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleShowReplies = async () => {
    const res = await getRepliesCommentsById(comment.id, me?.id, videoId);
    
    if (!res || res.error || !res.data) {
        return 
    }
    
    setRelatedComments(res.data);
    setShowReplies(true);
  };

  const handleAddEmoji = async (e: EmojiClickData) => {
    inputRef.current!.value += e.emoji
  }

  const handleOpenReplyInput = () => {
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
          src={comment.channel.avatarUrl || "/defaultImages/defaultAvatar.png"}
          alt={comment.channel.name}
        />
      </div>

      <div className={styles.comment_content}>
        <div className={styles.comment_header}>
          <Text className={styles.comment_username} weight={600}>
            {comment.channel.name}
          </Text>
          <Text size={12} color="var(--grayText)">
            {formatDate(comment.updatedDate)}
          </Text>
        </div>

        <div className={styles.comment_text}>
          <Text>{comment.text}</Text>
        </div>

        <div className={styles.comment_actions}>
          <button
            className={styles.reply_btn}
            onClick={() => handleOpenReplyInput()}
          >
            <Text size={14} weight={500}>
              Ответить
            </Text>
          </button>

          <button
            className={`${styles.action_btn} ${isLikedMe ? styles.active : ""}`}
            onClick={() =>
              handleLikeComment(
                isLikedMe,
                me?.id,
                comment.id,
                videoId,
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
                videoId,
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
            className={`${styles.action_btn} ${styles.action_btn_settings}`}
            onClick={() => setIsOpenedSettingPopover(prev => !prev)}
          >
            <Svg name="verticalEllipsis" />
          </button>

          <CreatorCommentSettingPopover isOpened={isOpenedSettingPopover} onClose={() => setIsOpenedSettingPopover(false)} commentId={comment.id} refreshData={refreshData}/>
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
                        comment.id,
                        setIsOpenedReplayInput,
                        inputRef,
                        refreshData
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

        {comment.repliesCount > 0 && (
          <Accordion
            header={
              !showReplies && (
                <button
                  className={styles.show_replies_btn}
                  onClick={() => handleShowReplies()}
                >
                  <Text size={14}>
                    {`${formatViews(comment.repliesCount)} ответ${
                      comment.repliesCount % 10 === 1 && comment.repliesCount !== 11 ? "" : "ов"
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
              {relatedComments?.comments.map((comment: ICommentFullInfo) => (
                <CreatorCommentCard
                  key={comment.id}
                  comment={comment}
                  commentStatistic={relatedComments.commentsStatistic?.[comment.id] || null}
                  videoId={videoId}
                  me={me}
                  refreshData={refreshData}
                />
              ))}
            </div>
          </Accordion>
        )}
      </div>
    </div>
  );
};
