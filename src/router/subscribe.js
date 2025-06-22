const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { Subscribe } = require("../model/Model");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact.lecrown@gmail.com',
    pass: 'dwqn lkir uzri dzpo',
  },
});

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (subscriber) {
      return res.status(400).json({ error: 'You have already subscribed' });
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    const subscriber = await Subscribe.findOne({ email });

    const htmlContent = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Welcome - Le Crown Interiors</title>
</head>

<body style="margin:0; padding:0; font-family:'Segoe UI', Arial, sans-serif; background-color: #222;">

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
        background="https://res.cloudinary.com/dflgxymvs/image/upload/v1747723816/lecrowninteriors/na5af39hohodvn58x5rr.avif"
        style="background-size:cover; background-position:center; background-repeat:no-repeat; width:100%; padding:0;">
        <tr>
            <td align="center" style="padding: 60px 20px; background-color: rgba(20, 15, 10, 0.7);">

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                    style="max-width:600px; margin:0 auto;">
                    <tr>
                        <td align="center">
                            <img src="https://res.cloudinary.com/dflgxymvs/image/upload/v1750573463/lecrowninteriors/vktslfdxnw1vxbgzfibr.avif"
                                alt="Le Crown Interiors Logo" width="80"
                                style="display:block; border-radius:8px; margin-bottom:20px;" />
                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="color:#f0e6d2; font-size:28px; font-weight:bold; padding-bottom: 10px;">
                            Welcome to Le Crown Interiors
                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="color:#e0e0e0; font-size:16px; line-height:1.6; padding: 0 10px 30px;">
                            You’re now subscribed to receive <strong style="color:#d4af37;">exclusive offers</strong>,
                            design inspiration, and luxury updates from Le Crown Interiors.
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <a href="https://le-crowninteriors.com"
                                style="background-color:#d4af37; color:#2e1e0f; text-decoration:none; padding:14px 30px; font-size:16px; font-weight:bold; border-radius:30px; display:inline-block;">
                                Explore Our Website
                            </a>
                        </td>
                    </tr>
 
                    <tr>
                        <td align="center" style="color:#ccc; font-size:12px; line-height:1.5; padding-top:10px;">
                            Thank you for choosing elegance.<br />
                            – The Le Crown Interiors Team
                        </td>
                    </tr>
                </table>
                 

            </td>
        </tr>
    </table>

</body>

</html>
  `;
    await new Subscribe({ email }).save();
    await transporter.sendMail({
      from: '"Le Crown Interiors" <contact.lecrown@gmail.com>',
      to: email,
      subject: '🎉 You are subscribed – Le Crown Interiors',
      html: htmlContent,
    });

    res.json({ message: 'Subscribed successfully. Confirmation email sent!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send subscription email.' });
  }
});

module.exports = router;
