import nodemailer from "nodemailer";

export const sendBookingEmail = async (req, res) => {
  try {
    const { name, email, mobile, services } = req.body;

    if (!name || !email || !mobile || !services || services.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const servicesList = services.join(", ");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SUPPORT_EMAIL,
      to: process.env.SUPPORT_TO,
      subject: `New Appointment Booking from ${name}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Services:</strong> ${servicesList}</p>
        <p>Booking Time: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Booking email sent successfully." });
  } catch (error) {
    console.error("Error in sendBookingEmail:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
