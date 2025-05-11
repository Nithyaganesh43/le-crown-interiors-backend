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

module.exports = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Authentication</title>
    <script src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/js/intlTelInput.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/css/intlTelInput.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100 h-screen flex justify-center items-center">

    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-semibold mb-4 text-center">OTP Authentication</h1>
        
        <form id="otpForm" class="space-y-4">
            <!-- Phone number input with country flags -->
            <div>
                <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number" required>
            </div>
            
            <!-- Send OTP button -->
            <div class="flex justify-center">
                <button type="button" id="sendOtp" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Send OTP</button>
            </div>
            
            <!-- OTP input -->
            <div id="otpSection" class="hidden">
                <div>
                    <label for="otp" class="block text-sm font-medium text-gray-700">Enter OTP</label>
                    <input type="text" id="otp" name="otp" class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter OTP" required>
                </div>

                <!-- Verify OTP button -->
                <div class="flex justify-center">
                    <button type="button" id="verifyOtp" class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition">Verify OTP</button>
                </div>
            </div>
        </form>

        <div id="message" class="mt-4 text-center text-sm"></div>
    </div>

    <script>
        // Initialize international phone number input
        const phoneInput = window.intlTelInput(document.querySelector("#phoneNumber"), {
            preferredCountries: ['IN', 'US', 'GB'], // List countries to show first
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/js/utils.js" // For validation
        });

        async function getBrowserData() {
            const data = {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screenWidth: screen.width,
                screenHeight: screen.height,
                colorDepth: screen.colorDepth,
                deviceMemory: navigator.deviceMemory,
                hardwareConcurrency: navigator.hardwareConcurrency,
                timezoneOffset: (new Date()).getTimezoneOffset(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                localStorage: !!window.localStorage,
                sessionStorage: !!window.sessionStorage,
                cookieEnabled: navigator.cookieEnabled
            };
            return data;
        }

        async function getClientId() {
            const fp = await FingerprintJS.load();
            const res = await fp.get();
            return res.visitorId;
        }

        async function sendToBackend(endpoint, data) {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            return await response.json();
        }

        document.getElementById('sendOtp').addEventListener('click', async () => {
            const phoneNumber = phoneInput.getNumber();
            if (!phoneInput.isValidNumber()) {
                document.getElementById('message').textContent = 'Please enter a valid phone number.';
                return;
            }

            const userBrowserData = await getBrowserData();
            const fingerprint = await getClientId();

            const response = await sendToBackend('https://le-crown-interiors-backend.onrender.com/sendotp', {
                phoneNumber,
                userBrowserData,
                fingerprint
            });

            if (response.status) {
                document.getElementById('message').textContent = response.message || 'OTP sent successfully.';
                document.getElementById('otpSection').classList.remove('hidden');
                document.getElementById('sendOtp').disabled = true;
            } else {
                document.getElementById('message').textContent = response.message || 'Failed to send OTP.';
            }
        });

        document.getElementById('verifyOtp').addEventListener('click', async () => {
            const otp = document.getElementById('otp').value;
            if (!otp) {
                document.getElementById('message').textContent = 'Please enter the OTP.';
                return;
            }

            const response = await sendToBackend('https://le-crown-interiors-backend.onrender.com/verifyotp', {
                userOtp: otp
            });

            if (response.status) {
                document.getElementById('message').textContent = 'OTP verified successfully!';
            } else {
                document.getElementById('message').textContent = response.message || 'OTP verification failed.';
            }
        });
    </script>

</body>

</html>
`;