import { FriendRequestStatus } from "@prisma/client";
import { prisma } from "../../lib/db/prismaClient";

const friendRequestChecker = async (
  user1: string,
  user2: string,
  status: FriendRequestStatus,
  msg: string
) => {
  const request = await prisma.friendRequest.findFirst({
    where: {
      senderId: user1,
      receiverId: user2,
      status: status,
    },
  });
  if (request) {
    return msg;
  } else {
    return "";
  }
};

export const friendRequestCheckerH = async (
  senderId: string,
  receiverId: string
) => {
  const requestCheck1 = await friendRequestChecker(
    senderId,
    receiverId,
    FriendRequestStatus.ACCEPTED,
    "aready a friend"
  );
  const requestCheck2 = await friendRequestChecker(
    senderId,
    receiverId,
    FriendRequestStatus.PENDING,
    "request already exist"
  );
  const requestCheck3 = await friendRequestChecker(
    receiverId,
    senderId,
    FriendRequestStatus.ACCEPTED,
    "aready a friend"
  );
  const requestCheck4 = await friendRequestChecker(
    receiverId,
    senderId,
    FriendRequestStatus.PENDING,
    "request sent to you already"
  );

  const requestCheck =
    requestCheck1 || requestCheck2 || requestCheck3 || requestCheck4;
  return requestCheck;
};
