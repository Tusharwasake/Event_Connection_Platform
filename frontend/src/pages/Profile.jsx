import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Edit,
  Settings,
  LogOut,
  Activity,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Image,
  Smile,
  Send,
  Plus,
} from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [suggestions, setSuggestions] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Get user details
        const userResponse = await axios.get(
          "https://two447-event-connection-platform-2.onrender.com/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(userResponse.data);

        // Fetch user's posts (mock data for now)
        // Would be replaced with actual API call
        setPosts(getMockPosts());

        // Fetch connection suggestions
        setSuggestions(getMockSuggestions());

        // Fetch upcoming events
        setUpcomingEvents(getMockEvents());

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Mock data functions (would be replaced with actual API calls)
  const getMockPosts = () => {
    return [
      {
        id: 1,
        content:
          "Just attended an amazing tech conference! The networking opportunities were incredible. Looking forward to connecting with everyone I met!",
        image:
          "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop",
        likes: 24,
        comments: [
          {
            id: 1,
            user: "Jane Smith",
            content: "It was great meeting you there!",
          },
          {
            id: 2,
            user: "Mike Johnson",
            content: "Which sessions did you enjoy the most?",
          },
        ],
        timestamp: "2024-05-01T14:30:00",
      },
      {
        id: 2,
        content:
          "Looking for recommendations on networking events in the Bangalore area for next month. Anyone have suggestions?",
        image: null,
        likes: 8,
        comments: [
          {
            id: 1,
            user: "Priya Sharma",
            content: "Check out the startup mixer on the 15th!",
          },
        ],
        timestamp: "2024-04-28T10:15:00",
      },
    ];
  };

  const getMockSuggestions = () => {
    return [
      {
        id: 1,
        name: "Sarah Williams",
        avatar:
          "https://ui-avatars.com/api/?name=Sarah+Williams&background=random",
        title: "UX Designer",
        mutualConnections: 3,
      },
      {
        id: 2,
        name: "Raj Patel",
        avatar: "https://ui-avatars.com/api/?name=Raj+Patel&background=random",
        title: "Software Engineer",
        mutualConnections: 5,
      },
      {
        id: 3,
        name: "Lisa Chen",
        avatar: "https://ui-avatars.com/api/?name=Lisa+Chen&background=random",
        title: "Product Manager",
        mutualConnections: 2,
      },
    ];
  };

  const getMockEvents = () => {
    return [
      {
        id: 1,
        title: "Tech Startup Networking Mixer",
        date: "May 15, 2024",
        location: "Innovation Hub, Bangalore",
        attendees: 45,
      },
      {
        id: 2,
        title: "Women in Tech Conference",
        date: "May 22, 2024",
        location: "Convention Center, Bangalore",
        attendees: 120,
      },
      {
        id: 3,
        title: "AI & Machine Learning Meetup",
        date: "June 05, 2024",
        location: "Tech Park, Whitefield",
        attendees: 75,
      },
    ];
  };

  // Handle image upload for new post
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image from new post
  const removeImage = () => {
    setNewPostImage(null);
    setImagePreview(null);
  };

  // Create new post
  const createPost = (e) => {
    e.preventDefault();

    if (!newPost.trim() && !newPostImage) return;

    // Create new post object
    const post = {
      id: Date.now(),
      content: newPost,
      image: imagePreview, // In a real app, this would be uploaded to server
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };

    // Add to posts array
    setPosts([post, ...posts]);

    // Reset form
    setNewPost("");
    setNewPostImage(null);
    setImagePreview(null);
  };

  // Like a post
  const likePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Add a comment to a post
  const addComment = (postId, comment) => {
    if (!comment.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            user: user?.name || "You",
            content: comment,
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      })
    );
  };

  // Connect with a suggested user
  const connectWithUser = (userId) => {
    setSuggestions(
      suggestions.filter((suggestion) => suggestion.id !== userId)
    );
    // Would send request to API to connect users
  };

  // Handle RSVP to an event
  const rsvpToEvent = (eventId) => {
    setUpcomingEvents(
      upcomingEvents.map((event) =>
        event.id === eventId ? { ...event, isAttending: true } : event
      )
    );
    // Would send RSVP to API
  };

  // Log out user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="profile-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Return to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-container">
            <img
              src={
                user?.avatar ||
                "https://ui-avatars.com/api/?name=User&size=200&background=random"
              }
              alt="Profile"
              className="profile-avatar"
            />
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-details">
            <h1>{user?.name || "User Name"}</h1>
            <p className="profile-username">@{user?.username || "username"}</p>
            <p className="profile-bio">{user?.bio || "No bio available"}</p>

            <div className="profile-meta">
              <div className="meta-item">
                <Mail className="meta-icon" />
                <span>{user?.email || "email@example.com"}</span>
              </div>
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <span>{user?.location || "Location"}</span>
              </div>
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <span>Joined {user?.joinDate || "Recently"}</span>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-edit">
              <Edit size={18} />
              <span>Edit Profile</span>
            </button>
            <button className="btn btn-settings">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{user?.connections || 0}</span>
            <span className="stat-label">Connections</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{posts.length || 0}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user?.eventsAttended || 0}</span>
            <span className="stat-label">Events</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Sidebar */}
        <div className="profile-sidebar left">
          <div className="sidebar-section">
            <h3>Connections</h3>
            <ul className="connection-list">
              {user?.recentConnections?.length > 0 ? (
                user.recentConnections.map((connection) => (
                  <li key={connection.id} className="connection-item">
                    <img
                      src={
                        connection.avatar ||
                        `https://ui-avatars.com/api/?name=${connection.name}`
                      }
                      alt={connection.name}
                      className="connection-avatar"
                    />
                    <div className="connection-details">
                      <span className="connection-name">{connection.name}</span>
                      <span className="connection-title">
                        {connection.title}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <div className="empty-state">
                  <p>Start connecting with people at events!</p>
                  <Link to="/events" className="link-button">
                    Find Events
                  </Link>
                </div>
              )}
            </ul>
            <Link to="/connections" className="view-all">
              View All Connections
            </Link>
          </div>

          <div className="sidebar-section">
            <h3>Upcoming Events</h3>
            <ul className="event-list">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <li key={event.id} className="event-item">
                    <div className="event-details">
                      <h4 className="event-title">{event.title}</h4>
                      <div className="event-meta">
                        <div className="event-date">
                          <Calendar size={14} />
                          <span>{event.date}</span>
                        </div>
                        <div className="event-location">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                        <div className="event-attendees">
                          <Users size={14} />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                    {!event.isAttending && (
                      <button
                        className="btn btn-rsvp"
                        onClick={() => rsvpToEvent(event.id)}
                      >
                        RSVP
                      </button>
                    )}
                    {event.isAttending && (
                      <span className="attending-badge">Attending</span>
                    )}
                  </li>
                ))
              ) : (
                <div className="empty-state">
                  <p>No upcoming events found.</p>
                  <Link to="/events" className="link-button">
                    Browse Events
                  </Link>
                </div>
              )}
            </ul>
            <Link to="/events" className="view-all">
              View All Events
            </Link>
          </div>
        </div>

        {/* Main Area */}
        <div className="profile-main">
          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === "posts" ? "active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              <Activity size={18} />
              <span>Posts</span>
            </button>
            <button
              className={`tab-button ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              <Calendar size={18} />
              <span>Events</span>
            </button>
            <button
              className={`tab-button ${
                activeTab === "connections" ? "active" : ""
              }`}
              onClick={() => setActiveTab("connections")}
            >
              <Users size={18} />
              <span>Connections</span>
            </button>
          </div>

          {/* Create Post */}
          {activeTab === "posts" && (
            <div className="create-post">
              <form onSubmit={createPost}>
                <div className="post-input-container">
                  <img
                    src={
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=User&size=50&background=random"
                    }
                    alt="Profile"
                    className="post-avatar"
                  />
                  <textarea
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  ></textarea>
                </div>

                {imagePreview && (
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={removeImage}
                    >
                      &times;
                    </button>
                  </div>
                )}

                <div className="post-actions">
                  <div className="post-attachments">
                    <label className="attachment-button">
                      <Image size={20} />
                      <span>Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-post"
                    disabled={!newPost.trim() && !newPostImage}
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts Tab Content */}
          {activeTab === "posts" && (
            <div className="posts-container">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="post">
                    <div className="post-header">
                      <img
                        src={
                          user?.avatar ||
                          "https://ui-avatars.com/api/?name=User&size=50&background=random"
                        }
                        alt="Profile"
                        className="post-avatar"
                      />
                      <div className="post-info">
                        <h3>{user?.name || "User Name"}</h3>
                        <span className="post-time">
                          {new Date(post.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="post-content">
                      <p>{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="post-image"
                        />
                      )}
                    </div>

                    <div className="post-stats">
                      <div className="post-stat">
                        <Heart size={16} />
                        <span>{post.likes} Likes</span>
                      </div>
                      <div className="post-stat">
                        <MessageCircle size={16} />
                        <span>{post.comments.length} Comments</span>
                      </div>
                    </div>

                    <div className="post-actions">
                      <button
                        className="post-action-button"
                        onClick={() => likePost(post.id)}
                      >
                        <Heart size={18} />
                        <span>Like</span>
                      </button>
                      <button className="post-action-button">
                        <MessageCircle size={18} />
                        <span>Comment</span>
                      </button>
                      <button className="post-action-button">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Comments section */}
                    {post.comments.length > 0 && (
                      <div className="post-comments">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="comment">
                            <img
                              src={`https://ui-avatars.com/api/?name=${comment.user}&size=40&background=random`}
                              alt={comment.user}
                              className="comment-avatar"
                            />
                            <div className="comment-content">
                              <div className="comment-header">
                                <span className="comment-author">
                                  {comment.user}
                                </span>
                              </div>
                              <p className="comment-text">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add comment form */}
                    <div className="add-comment">
                      <img
                        src={
                          user?.avatar ||
                          "https://ui-avatars.com/api/?name=User&size=40&background=random"
                        }
                        alt="Profile"
                        className="comment-avatar"
                      />
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const commentInput = e.target.elements.comment;
                          addComment(post.id, commentInput.value);
                          commentInput.value = "";
                        }}
                        className="comment-form"
                      >
                        <div className="comment-input-container">
                          <input
                            type="text"
                            name="comment"
                            placeholder="Write a comment..."
                            className="comment-input"
                          />
                          <button type="button" className="comment-emoji">
                            <Smile size={18} />
                          </button>
                        </div>
                        <button type="submit" className="comment-submit">
                          <Send size={18} />
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No posts yet. Create your first post!</p>
                </div>
              )}
            </div>
          )}

          {/* Events Tab Content */}
          {activeTab === "events" && (
            <div className="events-container">
              <div className="events-header">
                <h2>Your Events</h2>
                <Link to="/createform" className="btn btn-create-event">
                  <Plus size={18} />
                  <span>Create Event</span>
                </Link>
              </div>

              {user?.events?.length > 0 ? (
                <div className="events-grid">
                  {user.events.map((event) => (
                    <div key={event.id} className="event-card">
                      <div className="event-card-header">
                        <span className="event-date-badge">
                          <span className="month">{event.month}</span>
                          <span className="day">{event.day}</span>
                        </span>
                        <img
                          src={event.image}
                          alt={event.title}
                          className="event-card-image"
                        />
                      </div>
                      <div className="event-card-body">
                        <h3 className="event-card-title">{event.title}</h3>
                        <div className="event-card-location">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                        <p className="event-card-description">
                          {event.description}
                        </p>
                        <div className="event-card-attendees">
                          <Users size={14} />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                      <div className="event-card-footer">
                        <Link
                          to={`/events/${event.id}`}
                          className="btn btn-view-event"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't created or attended any events yet.</p>
                  <Link to="/events" className="link-button">
                    Find Events
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Connections Tab Content */}
          {activeTab === "connections" && (
            <div className="connections-container">
              <div className="connections-header">
                <h2>Your Connections</h2>
              </div>

              {user?.connections > 0 ? (
                <div className="connections-grid">
                  {user?.connectionsList?.map((connection) => (
                    <div key={connection.id} className="connection-card">
                      <img
                        src={
                          connection.avatar ||
                          `https://ui-avatars.com/api/?name=${connection.name}&background=random`
                        }
                        alt={connection.name}
                        className="connection-card-avatar"
                      />
                      <div className="connection-card-info">
                        <h3>{connection.name}</h3>
                        <p className="connection-title">{connection.title}</p>
                        <p className="connection-mutual">
                          <Users size={14} />
                          <span>
                            {connection.mutualConnections} mutual connections
                          </span>
                        </p>
                      </div>
                      <div className="connection-card-actions">
                        <button className="btn btn-message">Message</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't made any connections yet.</p>
                  <Link to="/people" className="link-button">
                    Find People
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="profile-sidebar right">
          <div className="sidebar-section">
            <h3>People You May Know</h3>
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} className="suggestion-item">
                  <img
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    className="suggestion-avatar"
                  />
                  <div className="suggestion-details">
                    <span className="suggestion-name">{suggestion.name}</span>
                    <span className="suggestion-title">{suggestion.title}</span>
                    <span className="mutual-connections">
                      <Users size={14} />
                      <span>
                        {suggestion.mutualConnections} mutual connections
                      </span>
                    </span>
                  </div>
                  <button
                    className="btn btn-connect"
                    onClick={() => connectWithUser(suggestion.id)}
                  >
                    <UserPlus size={16} />
                    <span>Connect</span>
                  </button>
                </li>
              ))}
            </ul>
            <Link to="/people" className="view-all">
              View More
            </Link>
          </div>

          <div className="sidebar-section">
            <h3>Event Recommendations</h3>
            <ul className="recommended-events">
              <li className="recommended-event">
                <h4>Developer Meetup</h4>
                <div className="event-meta">
                  <div>
                    <Calendar size={14} />
                    <span>May 20, 2024</span>
                  </div>
                  <div>
                    <MapPin size={14} />
                    <span>Tech Hub, Bangalore</span>
                  </div>
                </div>
                <button className="btn btn-event-interest">Interested</button>
              </li>
              <li className="recommended-event">
                <h4>Career Fair</h4>
                <div className="event-meta">
                  <div>
                    <Calendar size={14} />
                    <span>June 12, 2024</span>
                  </div>
                  <div>
                    <MapPin size={14} />
                    <span>Convention Center</span>
                  </div>
                </div>
                <button className="btn btn-event-interest">Interested</button>
              </li>
            </ul>
            <Link to="/events" className="view-all">
              Find More Events
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="profile-footer">
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/help">Help Center</Link>
        </div>
        <p className="footer-copyright">
          © 2024 LinkUp! - Event Connection Platform
        </p>
      </footer>
    </div>
  );
};

export default Profile;
