"use client";

import clsx from "clsx";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent, useRef, useState } from "react";

import { useToast } from "@/app/providers/toastProvider";
import { Text } from "@/shared/ui";
import { CreateCommentUnauthPopover } from "@/shared/ui/Popover/Popovers/CreateCommentUnauthPopover";
import { IChannelData } from "@/shared/utils/getChannelData";

import { handleCreateComment } from "../lib/createComment";

import styles from "./styles.module.scss";


interface IAddComment {
  me: IChannelData | null;
  videoId: string;
  handleRefreshCommentsList: () => void;
}

export const AddComment: React.FC<IAddComment> = ({
  me,
  videoId,
  handleRefreshCommentsList,
}) => {
  const [inputHidden, setInputHidden] = useState<boolean>(true);
  const [isEmojiesOpened, setIsEmojiesOpened] = useState<boolean>(false);
  const [isOpenedUnauthPopover, setIsOpenedUnauthPopover] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { openToast } = useToast();

  const handleCancel = () => {
    setInputHidden(true);
    setIsEmojiesOpened(false)

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCommentText = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    inputRef.current!.value = target.value
  }

  const handleAddEmoji = async (e: EmojiClickData) => {
    inputRef.current!.value += e.emoji
  }

  const handleOpenCommentInput = () => {
    if(me) {
      setInputHidden(false)
    } else {
      setIsOpenedUnauthPopover(true)
    } 
  }

  return (
    <div className={styles.container}>
      <img
        src={me?.avatarUrl ? process.env.NEXT_PUBLIC_BACKEND_URL + me?.avatarUrl : "defaultImages/defaultAvatar.png"}
        className={inputHidden ? styles.headerAvatar : styles.headerAvatarBig}
        alt=""
      />
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Введите комментарий"
          className={clsx(styles.input, { [styles.active]: !inputHidden })}
          onClick={() => handleOpenCommentInput()}
          onChange={(e) => handleCommentText(e)}
          ref={inputRef}
        />
        <CreateCommentUnauthPopover isOpen={isOpenedUnauthPopover} onClose={() => setIsOpenedUnauthPopover(false)} offset={0}/>
        {!inputHidden && (
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
                onClick={() => handleCancel()}
                className={styles.actions_btns_1}
              >
                <Text>Отмена</Text>
              </button>
              <button
                onClick={() =>
                  handleCreateComment(
                    inputRef.current?.value,
                    videoId,
                    me?.id || '',
                    setInputHidden,
                    inputRef,
                    openToast,
                    handleRefreshCommentsList
                  )
                }
                className={styles.actions_btns_2}
              >
                <Text color="var(--whiteText)">Оставить комментарий</Text>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
