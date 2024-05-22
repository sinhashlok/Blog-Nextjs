import nodemailer from "nodemailer";
import bcyrptjs from "bcryptjs";
import User from "@/model/user";

type Props = {
  email: string;
  userId: any;
};

export const sendEmailVerificationToken = async ({ email, userId }: Props) => {
  try {
    const hashedToken = await bcyrptjs.hash(userId.toString(), 10);

    await User.findByIdAndUpdate(userId, {
      $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      },
    });

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shlokjp@gmail.com",
        pass: "qlzj lkjm ysvt xhym",
      },
    });

    const html = `<p>
    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
    verify your email or copy and paste the link below in your browser
    <br>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`;

    const mailOption = {
      from: "blog.me@no-reply.com",
      to: email,
      subject: "Verify your email",
      html: html,
    };

    const mailResponse = await transport.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
