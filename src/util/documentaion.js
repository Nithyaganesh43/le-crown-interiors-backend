// module.exports = `<!DOCTYPE html>
// <!DOCTYPE html>
// <html lang="en" class="dark">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>/image/all Route Documentation</title>
//   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//   <style>
//     body {
//       background-color: #0f172a;
//       color: #f1f5f9;
//     }
//     code {
//       color: #c084fc;
//       background-color: #1e293b;
//       padding: 0.2rem 0.4rem;
//       border-radius: 0.25rem;
//     }
//     pre {
//       background-color: #1e293b;
//       color: #38bdf8;
//       padding: 1rem;
//       border-radius: 0.5rem;
//       overflow-x: auto;
//     }
//     h1, h2 {
//       color: #7dd3fc;
//     }
//   </style>
// </head>
// <body class="p-10">
//   <div class="max-w-5xl mx-auto">
//     <h1 class="text-4xl font-bold mb-6 text-center">GET /image/all – Get All Images Grouped by Folder</h1>

//     <section class="mb-10">
//       <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Endpoint Details</h2>
//       <div class="space-y-2">
//         <p><strong>Method:</strong> <span class="text-green-400">GET</span></p>
//         <p><strong>URL:</strong> <code>https://le-crown-interiors-backend.onrender.com/image/all</code></p>
//         <p><strong>Authentication:</strong> <span class="text-red-400">None Required</span></p>
//         <p><strong>Request Body:</strong> <span class="text-gray-400">Must be empty {} (empty object) or null</span></p>
//         <p><strong>Description:</strong> Returns all image data grouped by their folder name such as <code>"offers"</code>, <code>"hero"</code>, etc.</p>
//       </div>
//     </section>

//     <section class="mb-10">
//       <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Response Structure</h2>
//       <p class="mb-4">The response is a JSON object where keys are folder names and values are arrays of image objects.</p>
//       <pre class="text-sm rounded-lg">

// {
//   "offers": [
//     {
//       "img": {
//         "public_id": "lecrowninteriors/hsrtfdyvbtp6lvkptsux",
//         "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063750/lecrowninteriors/hsrtfdyvbtp6lvkptsux.avif",
//         "dimensions": {
//           "width": 369,
//           "height": 553
//         }
//       },
//       "name": "modern-living-room",
//       "title": "Elegant & Functional Living Spaces",
//       "content": "Transform your living room into a contemporary haven with sleek furniture, layered lighting, and earthy textures.",
//       "description": "Our modern living room designs blend comfort with luxury, utilizing open layouts, neutral tones, and handpicked decor accents to elevate your space."
//     },
//     {
//       "img": {
//         "public_id": "lecrowninteriors/zelf1fjtfx9greltub3y",
//         "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063707/lecrowninteriors/zelf1fjtfx9greltub3y.avif",
//         "dimensions": {
//           "width": 930,
//           "height": 1316
//         }
//       },
//       "name": "luxury-bedroom",
//       "title": "Serene Bedroom Interiors",
//       "content": "Create a peaceful retreat with custom-designed wardrobes, warm lighting, and plush textures.",
//       "description": "Designed for comfort and style, our luxury bedrooms feature soft color palettes, smart storage, and inviting ambiance to ensure restful nights."
//     },
//     {
//       "img": {
//         "public_id": "lecrowninteriors/x2dwiec2g48ugg0sdmmm",
//         "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746041229/lecrowninteriors/x2dwiec2g48ugg0sdmmm.avif",
//         "dimensions": {
//           "width": 4480,
//           "height": 2520
//         }
//       },
//       "name": "open-concept-kitchen",
//       "title": "Contemporary Kitchen Designs",
//       "content": "Maximize space and efficiency with open shelving, clean lines, and modern finishes.",
//       "description": "Our kitchen interiors are tailored for both form and function, using minimalist aesthetics and durable materials to support your culinary lifestyle."
//     }
//   ],
//   "hero": [
//     {
//       "img": {
//         "public_id": "lecrowninteriors/jfqzmfj9xkb2wuoke3zy",
//         "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062516/lecrowninteriors/jfqzmfj9xkb2wuoke3zy.avif",
//         "dimensions": {
//           "width": 1799,
//           "height": 1200
//         }
//       },
//       "name": "nithya-ganesh-portrait-1",
//       "title": "Creative Director",
//       "content": "With a passion for timeless design and innovation, Nithya leads our creative vision with elegance and precision.",
//       "description": "Nithya Ganesh, our lead designer, brings over a decade of experience crafting bespoke interiors that balance beauty with functionality."
//     },
//     {
//       "img": {
//         "public_id": "lecrowninteriors/iu5nczfvfhecjqytzmhn",
//         "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062475/lecrowninteriors/iu5nczfvfhecjqytzmhn.avif",
//         "dimensions": {
//           "width": 1920,
//           "height": 1102
//         }
//       },
//       "name": "nithya-ganesh-portrait-2",
//       "title": "Founder & Visionary",
//       "content": "Driven by excellence and innovation, Nithya transforms everyday spaces into works of art.",
//       "description": "As the founder of LeCrown Interiors, Nithya is committed to delivering personalized design solutions that reflect each client's unique style and story."
//     }
//   ]
// }



//       </pre>
//     </section>

//     <section class="mb-10">
//       <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Image Object Schema</h2>
//       <pre class="text-sm rounded-lg">
// {
//   "img": {
//     "public_id": "string",               // Cloudinary public ID
//     "url": "string",                     // Full Cloudinary URL (AVIF)
//     "dimensions": {
//       "width": number,                  // Pixel width
//       "height": number                  // Pixel height
//     }
//   },
//   "name": "string",                      // Uploader-provided or autogenerated
//   "title": "string",                     // Custom title
//   "content": "string",                   // Content field (short description)
//   "description": "string"                // Full description (up to 5000 chars)
// }
//       </pre>
//     </section>

//     <section>
//       <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Integration Notes</h2>
//       <ul class="list-disc list-inside space-y-1">
//         <li>Top-level keys represent content sections like <code>"offers"</code> or <code>"hero"</code> which is the folder name selected when upload.</li>
//         <li>Each section contains an array of image metadata objects following the schema.</li>
//         <li>Use this endpoint to load categorized content for rendering grouped UI elements.</li>
//         <li>📦 On initial page load, fetch the data from this endpoint and store it in <code>localStorage</code>. Use that cached data across pages to avoid repeated API calls.</li>
//       </ul>
//     </section>
//   </div>
// </body>
// </html>
// `;
module.exports = ` 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f9;
        }
        .container {
            width: 300px;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .message {
            color: red;
            text-align: center;
        }
        .error-details {
            font-size: 0.9rem;
            color: #e74c3c;
            margin-top: 10px;
            background-color: #f8d7da;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>OTP Verification</h2>
    <div id="sendOtpForm">
        <input type="text" id="phoneNumber" placeholder="Enter phone number" />
        <button onclick="sendOtp()">Send OTP</button>
        <p class="message" id="sendOtpMessage"></p>
        <div id="sendOtpErrorDetails" class="error-details" style="display: none;"></div>
    </div>

    <div id="verifyOtpForm" style="display: none;">
        <input type="text" id="otpCode" placeholder="Enter OTP" />
        <button onclick="verifyOtp()">Verify OTP</button>
        <p class="message" id="verifyOtpMessage"></p>
        <div id="verifyOtpErrorDetails" class="error-details" style="display: none;"></div>
    </div>
</div>

<script>
    const apiBase = "https://le-crown-interiors-backend.onrender.com/otp";
    
    async function sendOtp() {
        const phoneNumber = document.getElementById("phoneNumber").value;
        const sendOtpMessage = document.getElementById("sendOtpMessage");
        const sendOtpErrorDetails = document.getElementById("sendOtpErrorDetails");

        sendOtpMessage.textContent = '';
        sendOtpErrorDetails.style.display = 'none';

        if (!phoneNumber) {
            sendOtpMessage.textContent = "Please enter a valid phone number.";
            return;
        }

        try {
            const response = await fetch(apiBase + "/sendotp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (data.status) {
                sendOtpMessage.textContent = "OTP sent successfully!";
                document.getElementById("sendOtpForm").style.display = "none";
                document.getElementById("verifyOtpForm").style.display = "block";
            } else {
                sendOtpMessage.textContent = data.message;
                sendOtpErrorDetails.style.display = 'block';
                sendOtpErrorDetails.textContent = "Error: " + JSON.stringify(data);
            }
        } catch (error) {
            sendOtpMessage.textContent = "An error occurred. Please try again later.";
            sendOtpErrorDetails.style.display = 'block';
            sendOtpErrorDetails.textContent = "Error: " + error.message;
        }
    }

    async function verifyOtp() {
        const otpCode = document.getElementById("otpCode").value;
        const verifyOtpMessage = document.getElementById("verifyOtpMessage");
        const verifyOtpErrorDetails = document.getElementById("verifyOtpErrorDetails");

        verifyOtpMessage.textContent = '';
        verifyOtpErrorDetails.style.display = 'none';

        if (!otpCode) {
            verifyOtpMessage.textContent = "Please enter the OTP.";
            return;
        }

        try {
            const response = await fetch(apiBase + "/verifyotp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userOtp: otpCode }),
                credentials: 'include'  // to send cookies
            });

            const data = await response.json();

            if (data.status) {
                verifyOtpMessage.textContent = "OTP verified successfully!";
            } else {
                verifyOtpMessage.textContent = data.message;
                verifyOtpErrorDetails.style.display = 'block';
                verifyOtpErrorDetails.textContent = "Error: " + JSON.stringify(data);
            }
        } catch (error) {
            verifyOtpMessage.textContent = "An error occurred. Please try again later.";
            verifyOtpErrorDetails.style.display = 'block';
            verifyOtpErrorDetails.textContent = "Error: " + error.message;
        }
    }
</script>

</body>
</html>

`;
