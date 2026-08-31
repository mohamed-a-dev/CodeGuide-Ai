import { ChatRecord } from "@/types/chat.types";
import { formatTimeAgo, getChatDateGroupName } from "./date";

export const formatChats = (chats: ChatRecord[]) => {
    const map = new Map(); // {}
    [...chats]
        .sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
        )
        .forEach((chat) => {
            const groupName = getChatDateGroupName(chat.createdAt); // today | yesterday | 01-01-2027

            if (!map.has(groupName))
                map.set(groupName, { date: groupName, items: [] }); // { date => {date: dateGroup}}

            map.get(groupName).items.push({
                id: chat.id,
                title: chat.title,
                time: formatTimeAgo(chat.createdAt),
            });
        });

    return [...map.values()]
}