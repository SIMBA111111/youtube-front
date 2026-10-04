import { IChannelEntity } from "@/entities/channels/model/types";
import { ApiResponse } from "@/shared/types/apiResponse";

export const getMySubsChannels = async (
  userId: string,
  offset = 0,
  limit = 20
): Promise<ApiResponse<IChannelEntity[]> | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/my-channels/${userId}?offset=${offset}&limit=${limit}`,
      {
        credentials: "include",
      }
    );

    if (res.status === 200)
      return await res.json()

    return null
  } catch (error) {
    new Error(`Error getMySubsChannels: ${error}`);
    return null
  }
};
