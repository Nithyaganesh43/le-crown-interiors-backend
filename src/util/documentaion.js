module.exports = ` <!DOCTYPE html>
<html lang="en" class="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>/image/all Route Documentation</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #0f172a;
            color: #f1f5f9;
        }

        code {
            color: #c084fc;
            background-color: #1e293b;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
        }

        pre {
            background-color: #1e293b;
            color: #38bdf8;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
        }

        h1,
        h2 {
            color: #7dd3fc;
        }
    </style>
</head>

<body class="p-10">
    <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl font-bold mb-6 text-center">GET /image/all – Get All Images Grouped by Folder</h1>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Endpoint Details</h2>
            <div class="space-y-2">
                <p><strong>Method:</strong> <span class="text-green-400">GET</span></p>
                <p><strong>URL:</strong> <code>https://le-crown-interiors-backend.onrender.com/image/all</code></p>
                <p><strong>Authentication:</strong> <span class="text-red-400">None Required</span></p>
                <p><strong>Request Body:</strong> <span class="text-gray-400">Must be empty {} (empty object) or
                        null</span></p>
                <p><strong>Description:</strong> Returns all image data grouped by their folder name such as
                    <code>"offers"</code>, <code>"hero"</code>, etc.
                </p>
            </div>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Response Structure</h2>
            <p class="mb-4">The response is a JSON object where keys are folder names and values are arrays of image
                objects.</p>
            <pre class="text-sm rounded-lg">

{
  "offers": [
    {
      "img": {
        "public_id": "lecrowninteriors/hsrtfdyvbtp6lvkptsux",
        "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063750/lecrowninteriors/hsrtfdyvbtp6lvkptsux.avif",
        "dimensions": {
          "width": 369,
          "height": 553
        }
      },
      "name": "modern-living-room",
      "title": "Elegant & Functional Living Spaces",
      "content": "Transform your living room into a contemporary haven with sleek furniture, layered lighting, and earthy textures.",
      "description": "Our modern living room designs blend comfort with luxury, utilizing open layouts, neutral tones, and handpicked decor accents to elevate your space."
    },
    {
      "img": {
        "public_id": "lecrowninteriors/zelf1fjtfx9greltub3y",
        "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746063707/lecrowninteriors/zelf1fjtfx9greltub3y.avif",
        "dimensions": {
          "width": 930,
          "height": 1316
        }
      },
      "name": "luxury-bedroom",
      "title": "Serene Bedroom Interiors",
      "content": "Create a peaceful retreat with custom-designed wardrobes, warm lighting, and plush textures.",
      "description": "Designed for comfort and style, our luxury bedrooms feature soft color palettes, smart storage, and inviting ambiance to ensure restful nights."
    },
    {
      "img": {
        "public_id": "lecrowninteriors/x2dwiec2g48ugg0sdmmm",
        "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746041229/lecrowninteriors/x2dwiec2g48ugg0sdmmm.avif",
        "dimensions": {
          "width": 4480,
          "height": 2520
        }
      },
      "name": "open-concept-kitchen",
      "title": "Contemporary Kitchen Designs",
      "content": "Maximize space and efficiency with open shelving, clean lines, and modern finishes.",
      "description": "Our kitchen interiors are tailored for both form and function, using minimalist aesthetics and durable materials to support your culinary lifestyle."
    }
  ],
  "hero": [
    {
      "img": {
        "public_id": "lecrowninteriors/jfqzmfj9xkb2wuoke3zy",
        "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062516/lecrowninteriors/jfqzmfj9xkb2wuoke3zy.avif",
        "dimensions": {
          "width": 1799,
          "height": 1200
        }
      },
      "name": "nithya-ganesh-portrait-1",
      "title": "Creative Director",
      "content": "With a passion for timeless design and innovation, Nithya leads our creative vision with elegance and precision.",
      "description": "Nithya Ganesh, our lead designer, brings over a decade of experience crafting bespoke interiors that balance beauty with functionality."
    },
    {
      "img": {
        "public_id": "lecrowninteriors/iu5nczfvfhecjqytzmhn",
        "url": "http://res.cloudinary.com/dflgxymvs/image/upload/v1746062475/lecrowninteriors/iu5nczfvfhecjqytzmhn.avif",
        "dimensions": {
          "width": 1920,
          "height": 1102
        }
      },
      "name": "nithya-ganesh-portrait-2",
      "title": "Founder & Visionary",
      "content": "Driven by excellence and innovation, Nithya transforms everyday spaces into works of art.",
      "description": "As the founder of LeCrown Interiors, Nithya is committed to delivering personalized design solutions that reflect each client's unique style and story."
    }
  ]
}



      </pre>
        </section>

        <section class="mb-10">
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Image Object Schema</h2>
            <pre class="text-sm rounded-lg">
{
  "img": {
    "public_id": "string",               // Cloudinary public ID
    "url": "string",                     // Full Cloudinary URL (AVIF)
    "dimensions": {
      "width": number,                  // Pixel width
      "height": number                  // Pixel height
    }
  },
  "name": "string",                      // Uploader-provided or autogenerated
  "title": "string",                     // Custom title
  "content": "string",                   // Content field (short description)
  "description": "string"                // Full description (up to 5000 chars)
}
      </pre>
        </section>

        <section>
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Integration Notes</h2>
            <ul class="list-disc list-inside space-y-1">
                <li>Top-level keys represent content sections like <code>"offers"</code> or <code>"hero"</code> which is
                    the folder name selected when upload.</li>
                <li>Each section contains an array of image metadata objects following the schema.</li>
                <li>Use this endpoint to load categorized content for rendering grouped UI elements.</li>
                <li>📦 On initial page load, fetch the data from this endpoint and store it in
                    <code>localStorage</code>. Use that cached data across pages to avoid repeated API calls.
                </li>
            </ul>
        </section>
        <section class="mb-10">
            <h1 class="text-4xl font-bold mb-6 text-center">OTP API – Send & Verify OTP</h1>
        
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mb-4">Available Routes</h2>
            <ul class="list-disc list-inside space-y-2 text-sm">
                <li><code
                        class="bg-gray-800 text-blue-300 px-1 rounded">POST https://le-crown-interiors-backend.onrender.com/otp/sendotp</code>
                    – Send OTP to user’s phone</li>
                <li><code
                        class="bg-gray-800 text-blue-300 px-1 rounded">POST https://le-crown-interiors-backend.onrender.com/otp/verifyotp</code>
                    – Verify submitted OTP</li>
                <li><code
                        class="bg-gray-800 text-blue-300 px-1 rounded">GET https://le-crown-interiors-backend.onrender.com/otp/deleteall</code>
                    – (Dev only) Delete all OTP and user session data</li>
            </ul>
            
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-6 mb-4">Common Validation:</h2>
            <div class="space-y-2 text-sm">
                <div><code class="bg-gray-800 text-purple-300 px-1 rounded">BrowserData</code> = { userAgent: navigator.userAgent,
                    language: navigator.language }</div>
                <div><code class="bg-gray-800 text-purple-300 px-1 rounded">ClientId</code> = { const fp = await
                    FingerprintJS.load(); const res = await fp.get(); return res.visitorId; }</div>
                <div><span class="font-semibold">Headers:</span> <code
                        class="bg-gray-800 text-green-300 px-1 rounded">{ 'Content-Type': 'application/json' }</code></div>
                <div><span class="font-semibold">Credentials:</span> <code
                        class="bg-gray-800 text-green-300 px-1 rounded">include</code></div>
                <div><span class="font-semibold">Body:</span> <code
                        class="bg-gray-800 text-yellow-300 px-1 rounded"> { userBrowserData, fingerprint, phoneNumber or userOtp }</code>
                </div>
            </div>
            
            <pre class="bg-gray-800 text-red-300 text-sm p-4 rounded-lg mt-4 overflow-auto">
                        {
                          "status": false,
                          "message": "Invalid headers"
                        }
                        
                        {
                          "status": false,
                          "message": "Missing browser data"
                        }
                        
                        {
                          "status": false,
                          "message": "User agent mismatch"
                        }
                        
                        {
                          "status": false,
                          "message": "Language mismatch"
                        }
                        </pre>
                        <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-8 mb-4">1. POST /otp/sendotp</h2>
            <div class="space-y-2">
                <p><strong>Description:</strong> Generates and sends a 6-digit OTP. Sets a secure <code>otpToken</code> cookie
                    on success.</p>
        
                <p><strong>Request Body:</strong></p>
                <pre class="text-sm rounded-lg">
                {
                  "phone": "9876543210"
                }
                        </pre>
        
                <p><strong>Success Response:</strong></p>
                <pre class="text-sm rounded-lg">
                {
                  "status": true,
                  "message": "OTP sent"
                }
                        </pre>
        
                <p><strong>Failure Cases:</strong></p>
                <pre class="text-sm rounded-lg">
                // Invalid or missing phone
                {
                  "status": false,
                  "message": "Invalid phone number"
                }
                
                // Rate limit exceeded
                {
                  "status": false,
                  "message": "Too many attempts. Try again later"
                }
                
                // OTP already pending
                {
                  "status": false,
                  "message": "OTP already pending"
                }
                
                // Retry within a minute
                {
                  "status": false,
                  "message": "Wait before retrying"
                }
                
                // Blocked device or user
                {
                  "status": false,
                  "message": "Access denied"
                }
                
                // Already authorized device
                {
                  "status": true,
                  "message": "Already Authorized."
                }
                
                // Existing registration
                {
                  "status": true,
                  "message": "Authorized"
                }
                
                // Server error
                {
                  "status": false,
                  "message": "Internal error"
                }
                        </pre>
            </div>
        
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-8 mb-4">2. POST /otp/verifyotp</h2>
            <div class="space-y-2">
                <p><strong>Description:</strong> Verifies the OTP from the user. On success, returns user session data and
                    clears <code>otpToken</code>.</p>
        
                <p><strong>Request Body:</strong></p>
                <pre class="text-sm rounded-lg">
                {
                  "otp": "123456"
                }
                        </pre>
        
                <p><strong>Success Response:</strong></p>
                <pre class="text-sm rounded-lg">
                {
                  "status": true,
                  "message": "OTP verified",
                  "user": {
                    "phone": "9876543210",
                    ...
                  }
                }
                        </pre>
        
                <p><strong>Failure Cases:</strong></p>
                <pre class="text-sm rounded-lg">
                // Wrong OTP
                {
                  "status": false,
                  "message": "Invalid or expired OTP"
                }
                
                // Missing OTP
                {
                  "status": false,
                  "message": "OTP is required"
                }
                
                // Missing token
                {
                  "status": false,
                  "message": "Token missing"
                }
                
                // Invalid session
                {
                  "status": false,
                  "message": "Invalid session"
                }
                
                // Too many failed attempts
                {
                  "status": false,
                  "message": "Too many attempts"
                }
                        </pre>
            </div>
        
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-8 mb-4">3. GET /otp/deleteall</h2>
            <div class="space-y-2">
                <p><strong>Description:</strong> Deletes all records in <code>VerifiedUser</code> and <code>AuthAttempt</code>
                    collections. Clears cookies. Use only during testing.</p>
                <p><strong>Success Response:</strong></p>
                <pre class="text-sm rounded-lg">
                {
                  "status": true,
                  "message": "All data deleted"
                }
                        </pre>
            </div>
        
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-8 mb-4">Security & Validation</h2>
            <ul class="list-disc list-inside space-y-1">
                <li>Rate limiting: max 3 OTPs per 15 minutes per phone</li>
                <li><code>otpToken</code> is stored as a secure <code>HttpOnly</code> cookie</li>
                <li>OTP validity: default 5 minutes</li>
                <li>All endpoints protected via custom middleware <code>fireWall</code> (post-<code>/deleteall</code>)</li>
            </ul>
        
            <h2 class="text-2xl font-semibold border-b border-gray-600 pb-2 mt-8 mb-4">Integration Notes</h2>
            <ul class="list-disc list-inside space-y-1">
                <li>Always call <code>/sendotp</code> before <code>/verifyotp</code></li>
                <li>Store and display masked number on frontend</li>
                <li>Frontend should not handle OTP token manually; backend manages it via cookies</li>
                <li>Display backend error messages directly for best UX</li>
            </ul>
        </section>
        

    </div>
</body>

</html>
`;
 