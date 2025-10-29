export const isSameSenderMargin = (messages, m, i, userId) => {
  if(messages[i].sender._id !== userId)
    return '0';
  else return 'auto';
};
export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + ' year ago';
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + ' years ago';
  }

  interval = seconds / 2592000;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + ' month ago';
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + ' months ago';
  }

  interval = seconds / 86400;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + ' day ago';
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + ' days ago';
  }

  interval = seconds / 3600;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + ' hour ago';
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + ' hours ago';
  }

  interval = seconds / 60;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + ' minute ago';
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + ' minutes ago';
  }

  else 
    return 'few seconds ago';
}
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
export const getSender = (activeUser, users) => {
  return activeUser.id === users[0]._id ? users[1].name : users[0].name;
};
export const getChatName = (activeChat, activeUser) => {
  return activeChat?.users[0]?._id === activeUser.id 
    ? activeChat?.users[1]?.name
    : activeChat?.users[0]?.name;
};
export const getChatEmail = (activeChat, activeUser) => {
  return activeChat?.users[0]?._id === activeUser.id 
    ? activeChat?.users[1]?.email
    : activeChat?.users[0]?.email;
};
export const getChatPhoto = (activeChat, activeUser) => {
  return activeChat?.users[0]?._id === activeUser.id 
    ? activeChat?.users[1]?.profilePic
    : activeChat?.users[0]?.profilePic;
};
