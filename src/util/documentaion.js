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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Auth</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/js/intlTelInput.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/css/intlTelInput.min.css"/>
</head>
<body class="bg-gray-100 h-screen flex justify-center items-center">
  <div class="bg-white p-8 rounded-xl shadow-xl w-96">
    <h1 class="text-2xl font-semibold text-center mb-6">OTP Authentication</h1>
    <form id="otpForm" class="space-y-4">
      <div id="phoneSection">
        <label class="text-sm font-medium text-gray-700">Phone Number</label>
        <input type="tel" id="phoneNumber" class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required>
        <button type="button" id="sendOtp" class="w-full mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Send OTP</button>
      </div>
      <div id="otpSection" class="hidden">
        <label class="text-sm font-medium text-gray-700">Enter OTP</label>
        <input type="text" id="otp" maxlength="4" class="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
        <button type="button" id="verifyOtp" class="w-full mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Verify OTP</button>
      </div>
    </form>
    <div id="message" class="text-center text-sm mt-4 text-gray-600"></div>
  </div>

<script>
  const phoneInput = intlTelInput(document.querySelector("#phoneNumber"), {
    preferredCountries: ["in", "us"],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.15/build/js/utils.js",
  });

  let fingerprint = "";
  FingerprintJS.load().then(fp => fp.get()).then(res => fingerprint = res.visitorId);

  const getBrowserData = () => ({
    userAgent: navigator.userAgent,
    language: navigator.language
  });

  const showMessage = (msg, color = 'text-gray-600') => {
    const el = document.getElementById("message");
    el.textContent = msg;
    el.className = 'text-center text-sm mt-4 ' + color;
  };

  let currentPhone = ""; // Store normalized phone

  document.getElementById("sendOtp").onclick = async () => {
    const phone = phoneInput.getNumber();
    if (!phoneInput.isValidNumber()) {
      return showMessage("Invalid phone number", "text-red-500");
    }

    currentPhone = phone; // Save phone for later verification

    try {
      const res = await fetch('/otp/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: phone,
          fingerprint,
          userBrowserData: getBrowserData()
        })
      });

      const data = await res.json();
      if (data.status) {
        document.getElementById("phoneSection").classList.add("hidden");
        document.getElementById("otpSection").classList.remove("hidden");
        showMessage("OTP sent successfully", "text-green-600");
      } else {
        showMessage(data.message || "Failed to send OTP", "text-red-500");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      showMessage("Network error while sending OTP", "text-red-500");
    }
  };

  document.getElementById("verifyOtp").onclick = async () => {
    const otp = document.getElementById("otp").value.trim();
    if (!/^\d{4}$/.test(otp)) {
  return showMessage("Invalid OTP", "text-red-500");
}


    if (!currentPhone) {
      return showMessage("Phone number missing. Please restart process.", "text-red-500");
    }

    try {
      const res = await fetch('/otp/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: currentPhone,
          userOtp: otp,
          fingerprint,
          userBrowserData: getBrowserData()
        })
      });

      const data = await res.json();
      if (data.status) {
        showMessage("OTP Verified successfully", "text-green-600");
        // Optionally redirect here
      } else {
        showMessage(data.message || "OTP verification failed", "text-red-500");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      showMessage("Network error while verifying OTP", "text-red-500");
    }
  };
</script>

</body>
</html>
`;
