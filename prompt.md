Develop a simplified Instagram clone, named "Moonogram," focusing on essential features and a clean user interface. The application should feature a homepage displaying a feed of posts and an upload page for creating new posts. Implement a post scheduling feature, allowing users to specify a future date and time for their posts to be published. Integrate user signup and login functionalities using backend APIs. The UI should be simple and visually appealing, reflecting Instagram's aesthetic. Ensure the application is fully responsive, providing optimal viewing and usability across desktop and mobile devices. Minimize the number of buttons, tabs, and navigation elements to maintain a streamlined user experience. The design should be intuitive and user-friendly.

very clear with the backend align the structure same given below 
📌 Base URL
 
https://le-crown-interiors-backend.onrender.com/miniapp
1. 📤 Create User (Signup)
POST /signup


Request Body:
{
  "username": "alice"
}

Response:
{
  "_id": "66406f48e177dd43f8228e35",
  "username": "alice",
  "followers": [],
  "__v": 0
}
2. ➕ Follow Another User
POST /follow


Request Body:
{
  "me": "66406f48e177dd43f8228e35",
  "other": "66406f64e177dd43f8228e39"
}

Response:
{
  "_id": "66406f64e177dd43f8228e39",
  "username": "bob",
  "followers": ["66406f48e177dd43f8228e35"],
  "__v": 1
}
3. 🖼️ Create Post with Schedule
POST /post


Request Body:
{
  "userId": "66406f48e177dd43f8228e35",
  "caption": "Scheduled sunset view!",
  "image": "https://example.com/sunset.jpg",
  "time": "2025-05-12T17:30:00.000Z"
}

Response:
{
  "_id": "66407556d4e911e90bfb317d",
  "user": "66406f48e177dd43f8228e35",
  "caption": "Scheduled sunset view!",
  "image": "https://example.com/sunset.jpg",
  "likes": [],
  "createdAt": "2025-05-12T13:30:00.000Z",
  "publishAt": "2025-05-12T17:30:00.000Z",
  "published": false,
  "__v": 0
}
4. 📃 Get All Published Posts
GET /posts


Response:
[
  {
    "_id": "66407556d4e911e90bfb317d",
    "user": {
      "_id": "66406f48e177dd43f8228e35",
      "username": "alice"
    },
    "caption": "Scheduled sunset view!",
    "image": "https://example.com/sunset.jpg",
    "likes": ["66406f64e177dd43f8228e39"],
    "createdAt": "2025-05-12T13:30:00.000Z",
    "publishAt": "2025-05-12T17:30:00.000Z",
    "published": true,
    "__v": 1
  }
]
5. ❤️ Like a Post
POST /like


Request Body:
{
  "postId": "66407556d4e911e90bfb317d",
  "userId": "66406f64e177dd43f8228e39"
}

Response:
{
  "_id": "66407556d4e911e90bfb317d",
  "user": "66406f48e177dd43f8228e35",
  "caption": "Scheduled sunset view!",
  "image": "https://example.com/sunset.jpg",
  "likes": ["66406f64e177dd43f8228e39"],
  "createdAt": "2025-05-12T13:30:00.000Z",
  "publishAt": "2025-05-12T17:30:00.000Z",
  "published": true,
  "__v": 1
}
6. 🔔 Send Dummy Notification
POST /notify


Request Body:
{
  "userId": "66406f48e177dd43f8228e35",
  "msg": "Your post has gone live!"
}

Response:
{
  "ok": true
}

 base url 
 https://le-crown-interiors-backend.onrender.com
 
 POST /miniapp/signup — create user

POST /miniapp/follow — follow user

GET /miniapp/posts — view published posts

POST /miniapp/like — like a post

POST /miniapp/post — create post with schedule

POST /miniapp/notify — simulate notification


✅ 1. Signup
POST /miniapp/signup


{
  "username": "alice"
}
✅ 2. Follow
POST /miniapp/follow


{
  "me": "66406f48e177dd43f8228e35",
  "other": "66406f64e177dd43f8228e39"
}
Replace me and other with actual user _ids returned from /signup.

✅ 3. Create Post with Schedule
POST /miniapp/post


{
  "userId": "66406f48e177dd43f8228e35",
  "caption": "My first scheduled post!",
  "image": "https://example.com/image.jpg",
  "time": "2025-05-12T15:00:00.000Z"
}
time must be in ISO format (new Date().toISOString() in JS). Must be a future time to test scheduler.

✅ 4. Get All Published Posts
GET /miniapp/posts
(No body)

✅ 5. Like Post
POST /miniapp/like


{
  "postId": "66407220d4e911e90bfb3179",
  "userId": "66406f48e177dd43f8228e35"
}
✅ 6. Send Dummy Notification
POST /miniapp/notify


{
  "userId": "66406f48e177dd43f8228e35",
  "msg": "Your scheduled post is now live!"
}



### User Authentication

- User signup and login functionality ask password {dummy user dont know}
- Session management using cookies
- Follow/unfollow other users


### Post Management

- Feed page displaying all published posts
- Create post page with image URL and caption
- Post scheduling feature with date and time picker
- Like/unlike posts


### UI/UX

- Clean, minimalist design inspired by Instagram
- Responsive layout for both mobile and desktop
- Streamlined navigation with minimal buttons
- Loading states and error handling


### Backend Integration

- All API endpoints are integrated as specified
- Server actions for API calls
- Proper error handling and loading states


## How It Works

1. **Authentication Flow**:

1. Users can sign up or log in with a username
2. Authentication state is stored in HTTP-only cookies
3. Protected routes redirect to login if not authenticated



2. **Post Creation and Scheduling**:

1. Users can create posts with an image URL and caption
2. Posts can be scheduled for future publication
3. Date and time picker for easy scheduling



3. **Social Features**:

1. Users can like/unlike posts
2. Users can follow other users
3. Post feed shows all published posts
