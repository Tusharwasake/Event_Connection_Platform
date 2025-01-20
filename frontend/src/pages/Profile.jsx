import React, { useState } from "react";
import {
  Search,
  UserPlus,
  MessageCircle,
  Heart,
  Share2,
  Bell,
  Mail,
} from "lucide-react";
// import "./SocialMediaApp.css";

const currentUserData = {
  id: 1,
  username: "john_doe",
  name: "John Doe",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&size=50",
  friends: [2],
  pending: [3],
};

const initialUsers = [
  currentUserData,
  {
    id: 2,
    username: "jane_smith",
    name: "Jane Smith",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&size=50",
    friends: [1],
    pending: [],
  },
  {
    id: 3,
    username: "sam_wilson",
    name: "Sam Wilson",
    avatar: "https://ui-avatars.com/api/?name=Sam+Wilson&size=50",
    friends: [],
    pending: [1],
  },
  {
    id: 4,
    username: "alice_brown",
    name: "Alice Brown",
    avatar: "https://ui-avatars.com/api/?name=Alice+Brown&size=50",
    friends: [],
    pending: [],
  },
];

const initialPosts = [
  {
    id: 1,
    userId: 1,
    content: "Just had an amazing weekend!",
    likes: 5,
    comments: [{ id: 1, userId: 2, content: "Looks fantastic!" }],
    timestamp: "2024-01-18T10:00:00",
  },
];

const Profile = () => {
  const [currentUser] = useState(currentUserData);
  const [users, setUsers] = useState(initialUsers);
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      userId: currentUser.id,
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const likePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const sendFriendRequest = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, pending: [...user.pending, currentUser.id] }
          : user
      )
    );
  };

  const acceptFriendRequest = (userId) => {
    setUsers(
      users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            friends: [...user.friends, userId],
            pending: user.pending.filter((id) => id !== userId),
          };
        }
        if (user.id === userId) {
          return {
            ...user,
            friends: [...user.friends, currentUser.id],
          };
        }
        return user;
      })
    );
  };

  return (
    <div className="social-media-app">
      {/* Navbar */}
      {/* <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">SocialApp</h1>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="nav-icons">
            <Bell className="icon" />
            <Mail className="icon" />
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="container">
        {/* Profile Section */}
        <aside className="profile-section">
          <div className="profile-card">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="profile-avatar"
            />
            <h2>{currentUser.name}</h2>
            <p>@{currentUser.username}</p>
            <div className="profile-stats">
              <div>
                <span>Friends</span>
                <span>{currentUser.friends.length}</span>
              </div>
              <div>
                <span>Pending</span>
                <span>{currentUser.pending.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Posts Section */}
        <main className="posts-section">
          <div className="create-post">
            <form onSubmit={createPost}>
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
          <div className="posts">
            {posts.map((post) => {
              const user = users.find((u) => u.id === post.userId);
              return (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <img
                      src={user.avatar}
                      alt="User"
                      className="post-avatar"
                    />
                    <div>
                      <h3>{user.name}</h3>
                      <span>
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="post-content">{post.content}</p>
                  <div className="post-actions">
                    <button onClick={() => likePost(post.id)}>
                      <Heart /> {post.likes}
                    </button>
                    <button>
                      <MessageCircle /> {post.comments.length}
                    </button>
                    <button>
                      <Share2 />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        {/* Suggestions Section */}
        <aside className="suggestions-section">
          <div className="suggestions">
            <h2>People you may know</h2>
            {users
              .filter(
                (user) =>
                  user.id !== currentUser.id &&
                  !currentUser.friends.includes(user.id) &&
                  !user.pending.includes(currentUser.id)
              )
              .map((user) => (
                <div key={user.id} className="suggestion">
                  <img
                    src={user.avatar}
                    alt="User"
                    className="suggestion-avatar"
                  />
                  <div>
                    <h3>{user.name}</h3>
                    <p>@{user.username}</p>
                  </div>
                  <button onClick={() => sendFriendRequest(user.id)}>
                    <UserPlus />
                  </button>
                </div>
              ))}
          </div>
          {currentUser.pending.length > 0 && (
            <div className="friend-requests">
              <h2>Friend Requests</h2>
              {users
                .filter((user) => currentUser.pending.includes(user.id))
                .map((user) => (
                  <div key={user.id} className="request">
                    <img
                      src={user.avatar}
                      alt="User"
                      className="request-avatar"
                    />
                    <div>
                      <h3>{user.name}</h3>
                      <p>@{user.username}</p>
                    </div>
                    <button
                      className="btn btn-accept"
                      onClick={() => acceptFriendRequest(user.id)}
                    >
                      Accept
                    </button>
                  </div>
                ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Profile;
