import { ApiResponse } from "@/shared/types/apiResponse";

interface IUpdateSubscription {
  isSubscribed: boolean;
}

export const updateSubscription = async (
  channelId: string,
  userId: string,
  isSubscribed: boolean
): Promise<ApiResponse<IUpdateSubscription> | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscribe`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channelId, userId, isSubscribed }),
      }
    );

    if (res.status === 200) {
      return await res.json();
    }

    return null;
  } catch (error) {
    return null;
  }
};