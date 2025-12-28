import nodemailer from "nodemailer";

export const sendBookingEmail = async (req, res) => {
  try {
    const { name, email, mobile, date, time, services } = req.body;

    if (
      !name ||
      !email ||
      !mobile ||
      !date ||
      !time ||
      !services ||
      services.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // ✅ Format real user name properly
    const formattedName = name
      .trim()
      .split(" ")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");

    const servicesList = services.map(s => `<li>${s}</li>`).join("");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Appointment Desk" <${process.env.SUPPORT_EMAIL}>`,
      to: process.env.SUPPORT_TO,
      subject: `📅 New Appointment Booking – ${formattedName}`,
      html: `
      <div style="background-color:#f4f8fb;padding:30px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#007ACC,#005EA1);padding:24px;color:#ffffff;text-align:center;">
            <h1 style="margin:0;font-size:26px;">New Appointment Booked</h1>
            <p style="margin-top:6px;font-size:14px;opacity:0.9;">
              ${formattedName} has scheduled a new appointment
            </p>
          </div>

          <!-- Body -->
          <div style="padding:30px;color:#333333;">
            <h2 style="margin-top:0;color:#007ACC;">Customer Details</h2>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-weight:bold;">Name</td>
                <td style="padding:10px 0;">${formattedName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;">Email</td>
                <td style="padding:10px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;">Mobile</td>
                <td style="padding:10px 0;">${mobile}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;">Date</td>
                <td style="padding:10px 0;">${date}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:bold;">Time</td>
                <td style="padding:10px 0;">${time}</td>
              </tr>
            </table>

            <h2 style="margin-top:30px;color:#007ACC;">Selected Services</h2>
            <ul style="padding-left:18px;line-height:1.6;">
              ${servicesList}
            </ul>

            <div style="margin-top:30px;padding:16px;background:#e8f4ff;border-left:5px solid #007ACC;border-radius:8px;">
              <strong>Booking Created On:</strong><br/>
              ${new Date().toLocaleString()}
            </div>

            <p style="margin-top:30px;font-size:14px;color:#555;">
              Please contact the customer to confirm the appointment.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f0f4f8;padding:16px;text-align:center;font-size:12px;color:#777;">
            © ${new Date().getFullYear()} Appointment System  
            <br/>
            This is an automated email. Please do not reply.
          </div>

        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Booking email sent successfully.",
    });
  } catch (error) {
    console.error("Error in sendBookingEmail:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
