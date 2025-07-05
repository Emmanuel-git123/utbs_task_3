const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const send_otp = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `UTBS Support <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h3>Your OTP is: <b>${otp}</b></h3>
                    <p>This code is valid for 10 minutes. Please do not share it with anyone.</p>
                    <p style="margin-top:20px;">- UTBS Support Team</p>
                </div>
            `,
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Could not send OTP email");
    }
};

module.exports = send_otp;
