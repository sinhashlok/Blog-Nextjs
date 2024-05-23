import { Resend } from "resend";
import bcryptjs from "bcryptjs";
import User from "@/model/user";

type Props = {
  email: string;
  userId: any;
};

export default async function sendEmailVerificationToken({
  email,
  userId,
}: Props) {
  const resend = new Resend(process.env.RESEND_API || "");

  const hashedToken = await bcryptjs.hash(userId.toString(), 10);
  await User.findByIdAndUpdate(userId, {
    $set: {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000,
    },
  });

  await resend.emails
    .send({
      from: "dev.me@resend.dev",
      to: email,
      subject: "Verification Email",
      html: `<div>
    <h1>Email Verification</h1>
    <br />
    <p>Click here for <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">email verification</a>
    <br />
    Or Copy Paste the below URL in your browser:
    <br />
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>
    </div>`,
    })
    .catch((error) => console.log("Email Error", error));
}
