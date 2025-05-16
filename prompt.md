
 
✅ Base URL
https://le-crown-interiors-backend.onrender.com/poova

🔹 1. POST /add-user
Valid body:

{ "phonenumber": "9999999999", "password": "abc123" }
✅ Test Cases
Test Case	Input	Expected Output
✅ Create new user	Valid phonenumber, password	{ msg: "created", user: {...} }
✅ Login existing user, correct password	Same phonenumber and password	{ msg: "ok" }
❌ Login existing user, wrong password	Same phonenumber, wrong password	{ msg: "wrong password" }
❌ Missing password	{ "phonenumber": "9999999999" }	500, error message
❌ Missing phonenumber	{ "password": "abc123" }	500, error message
❌ Empty body	{}	500, error message
❌ Invalid JSON	Raw text "phonenumber:999"	500, error parsing JSON

🔹 2. POST /rentrequest
Valid body:

{
  "phonenumber": "9999999999",
  "img": {
    "public_id": "abc123",
    "url": "https://example.com/img.jpg",
    "dimensions": {
      "width": 800,
      "height": 600
    }
  },
  "name": "John",
  "title": "Need Interior Work",
  "content": "Full home renovation",
  "description": "Detailed description here"
}
✅ Test Cases
Test Case	Input Changes	Expected Output
✅ Valid request	All fields present	Document with _id, status:pending
❌ Missing optional img	Remove img	Still creates, defaults work
❌ Missing required name	Remove name	500, error message
❌ Invalid dimensions	"dimensions": "800x600"	500, error message
❌ Invalid data types	"width": "wide"	500, error
❌ Extra unknown fields	Add "extra": "xyz"	Should ignore or save if schema open
❌ Empty body	{}	500, error

🔹 3. POST /trackrequest
Valid body:

{ "_id": "<valid-object-id>" }
✅ Test Cases
Test Case	Input	Expected Output
✅ Valid existing ID	Correct _id	Request object
❌ Non-existing ID	Valid format but not in DB	{ msg: "not found" }
❌ Invalid ObjectId	{ "_id": "123" }	500, cast error
❌ Missing _id	{}	500, error
❌ Empty string _id	{ "_id": "" }	500, cast error

🔹 4. POST /getrequests
Body: {} or none

✅ Test Cases
Test Case	Input	Expected Output
✅ Requests exist	{}	Array of request objects
✅ No requests in DB	{}	[]
❌ Invalid body	Raw text	Still works or ignored body
response [
  {
    "_id": "6645f792a542e94c12345678",
    "phonenumber": "9042421622",
    "img": {
      "public_id": "lecrowninteriors/qhi0lfrsd6nfevspb1q4",
      "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1747374740/lecrowninteriors/qhi0lfrsd6nfevspb1q4.avif",
      "dimensions": {
        "width": 337,
        "height": 149
      }
    },
    "name": "Nithya Ganesh",
    "title": "title",
    "content": "some sontent",
    "description": "wdetailed discription",
    "status": "pending",
    "__v": 0
  }
]

🔹 5. POST /respondrequests
Valid body:

{
  "_id": "<valid-object-id>",
  "response": "approved"
}
✅ Test Cases
Test Case	Input	Expected Output
✅ Valid update	Existing _id, valid response	Updated request object
❌ Non-existing _id	Valid format but not in DB	{ msg: "not found" }
❌ Invalid _id format	_id = "123"	500, cast error
❌ Missing _id	{ "response": "approved" }	500, error
❌ Missing response	{ "_id": "<valid-id>" }	500, error
❌ Invalid response value	response = 12345	Accepts unless enum enforced
