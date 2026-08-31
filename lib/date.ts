import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (date: Date | string) => {
    return formatDistanceToNow(new Date(date), {
        addSuffix: false,
    }).replace('about', '');
}

export const getChatDateGroupName = (createdAt: Date) => {
    const date = new Date(createdAt);

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let groupName;
    if (date.toDateString() === today.toDateString()) {
        groupName = "today";
    }
    else if (date.toDateString() === yesterday.toDateString()) {
        groupName = "yesterday";
    }
    else {
        groupName = date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return groupName;
}