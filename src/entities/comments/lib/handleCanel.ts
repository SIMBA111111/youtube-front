import type { RefObject } from "react";

export const handleCancel = async (
  setIsOpenedReplayInput: (value: boolean) => void,
  inputRef: RefObject<HTMLInputElement | null>
) => {
  console.log("handleCancel");

  setIsOpenedReplayInput(false);
  if (inputRef.current) {
    inputRef.current.value = "";
  }
};
