const socket = io("http://localhost:3000");

// Friend Requests
const sendRequestButton = document.getElementById("sendRequest");
const friendRequestsList = document.getElementById("friendRequests");

sendRequestButton.addEventListener("click", async () => {
  try {
    await fetch("http://localhost:3000/api/friends/sendFriendRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderId: "dummy1", receiverId: "dummy2" }),
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
  }
});

socket.on("receiveFriendRequest", (request) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${request.sender} sent a friend request to ${request.receiver}`;
  friendRequestsList.appendChild(listItem);
});

// Groups
const createGroupButton = document.getElementById("createGroup");
const groupsList = document.getElementById("groups");

createGroupButton.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/groups/createGroup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Study Group",
          participants: ["dummy1", "dummy2"],
        }),
      }
    );
    const data = await response.json();
    const listItem = document.createElement("li");
    listItem.textContent = data.group.name;
    groupsList.appendChild(listItem);
  } catch (error) {
    console.error("Error creating group:", error);
  }
});

// Chat
const sendMessageButton = document.getElementById("sendMessage");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messages");

sendMessageButton.addEventListener("click", async () => {
  const message = messageInput.value;
  try {
    await fetch("http://localhost:3000/api/chats/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: "groupId1",
        senderId: "dummy1",
        message,
      }),
    });
    messageInput.value = "";
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

socket.on("receiveMessage", (msg) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${msg.sender}: ${msg.message}`;
  messagesList.appendChild(listItem);
});
