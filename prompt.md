Develop a frontend for a real estate website using Next.js and Tailwind CSS. The website should support a single admin and multiple users, with the following features:

User Functionality:

*   **Login:** Implement a secure login system.
*   **Property Listing:** Display all available properties in an attractive and user-friendly UI. Each property should have a detailed view.
*   **Request Submission:** Allow users to submit requests for specific properties.
*   **Request Tracking:** Enable users to track the status of their requests.
*   **Request Status:** Display whether a request has been approved or denied.

Admin Functionality:

*   **Admin Login:** Implement a separate login for the admin with the following credentials:
    *   Phone Number: "9043296496"
    *   Password: "poovaaa"
*   **Admin Dashboard:** Create an admin dashboard where the admin can view all submitted requests and manage them by approving or denying them.

Backend Integration:

*   Integrate the frontend with the provided backend structure and endpoint credentials. Ensure proper authentication and data fetching.

UI/UX:

*   Design an intuitive and visually appealing user interface.
*   Ensure the website is responsive and works well on different devices.

Additional Considerations:

rememer for the data disply use this
GET https://le-crown-interiors-backend.onrender.com/image/all
dynamically updated some image will be added in both the folders
response :
{"highclass":[{"img":{"public_id":"lecrowninteriors/quihmay4ql2bsx2ys6sb","url":"http://res.cloudinary.com/dflgxymvs/image/upload/v1747374557/lecrowninteriors/quihmay4ql2bsx2ys6sb.avif","dimensions":{"width":300,"height":168}},"name":"download","title":"square","content":"Prime land for sale in a serene location, perfect for residential or commercial development. Spacious plot with clear legal titles, excellent road access, and nearby amenities including schools, markets, and public transport. Ideal investment opportunity with high appreciation potential.","description":"This well-located plot of land offers an excellent opportunity for building your dream home or a profitable commercial project. Situated in a peaceful neighborhood, the land is easily accessible by main roads and close to essential services like schools, hospitals, and shopping centers. The property comes with clear ownership documents, ensuring a smooth transaction. Whether for personal use or investment, this land promises growth and convenience in equal measure.\r\n\r\npricing : 20000/month"}],"lowlevel":[{"img":{"public_id":"lecrowninteriors/qhi0lfrsd6nfevspb1q4","url":"http://res.cloudinary.com/dflgxymvs/image/upload/v1747374740/lecrowninteriors/qhi0lfrsd6nfevspb1q4.avif","dimensions":{"width":337,"height":149}},"name":"dry","title":"big land","content":"Expansive large land parcel for sale, ideal for residential township, commercial projects, or agricultural use. Strategically located with excellent road connectivity, ample space for development, and surrounded by growing infrastructure and amenities.","description":"This vast landholding offers a rare opportunity to acquire a large, contiguous plot suitable for multiple purposes including large-scale residential developments, commercial complexes, or extensive farming. The property boasts excellent accessibility via major roads, proximity to essential services, and strong potential for future growth. With clear legal titles and flexible usage options, this land is perfect for investors and developers looking for significant scale and value.\r\n\r\nprice : 500000/year"},{"img":{"public_id":"lecrowninteriors/hyz4cb8ebgs7op0munaf","url":"http://res.cloudinary.com/dflgxymvs/image/upload/v1747374662/lecrowninteriors/hyz4cb8ebgs7op0munaf.avif","dimensions":{"width":275,"height":183}},"name":"farm","title":"agri","content":"Agricultural land available for sale, fertile and well-irrigated, ideal for farming and cultivation. Located in a rural area with easy access to water sources and good connectivity to nearby markets. Suitable for growing a variety of crops and agro-based activities.","description":"This agricultural plot offers fertile soil and reliable irrigation facilities, making it perfect for diverse farming operations. Located in a peaceful rural setting, the land provides good access to water and is connected to nearby markets for easy produce sale. With clear ownership and legal documentation, this land is a valuable asset for farmers and investors looking to expand agricultural ventures.\r\n\r\nprice : 15000/month"}]}

for other functionalities

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
❌ Invalid response value	response = 12345