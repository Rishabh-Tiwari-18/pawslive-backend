import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    // Format real user name ()
    const formattedName = name
      .trim()
      .split(" ")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Website Contact" <${process.env.SUPPORT_EMAIL}>`,
      to: process.env.SUPPORT_TO,
      subject: `📩 New Query from ${formattedName}`,
      html: `
      <div style="background:#f4f8fb;padding:30px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#007ACC,#005EA1);padding:22px;text-align:center;color:#ffffff;">
            <h1 style="margin:0;font-size:24px;">New Contact Query</h1>
            <p style="margin-top:6px;font-size:14px;opacity:0.9;">
              You have received a new message from ${formattedName}
            </p>
          </div>

          <!-- Body -->
          <div style="padding:28px;color:#333;">
            <h2 style="margin-top:0;color:#007ACC;">
              Query from ${formattedName}
            </h2>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;font-weight:bold;width:90px;">Name</td>
                <td style="padding:8px 0;">${formattedName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:bold;">Email</td>
                <td style="padding:8px 0;">${email}</td>
              </tr>
            </table>

            <div style="margin-top:20px;">
              <h3 style="margin-bottom:8px;color:#007ACC;">Message</h3>
              <div style="padding:16px;background:#f1f7ff;border-left:4px solid #007ACC;border-radius:8px;line-height:1.6;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
            </div>

            <p style="margin-top:24px;font-size:13px;color:#666;">
              Message received on: <br/>
              <strong>${new Date().toLocaleString()}</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f0f4f8;padding:14px;text-align:center;font-size:12px;color:#777;">
            © ${new Date().getFullYear()} Website Contact System  
            <br/>
            This is an automated email. Do not reply.
          </div>

        </div>
      </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending message.",
    });
  }
};
