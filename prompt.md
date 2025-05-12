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