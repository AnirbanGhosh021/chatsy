import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplates } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
     to: "anirban22100100@gmail.com",
      subject: "Welcome to Chatsy",
      html: createWelcomeEmailTemplates(name, clientURL)
    });

    if (error) {
      console.log("Error sending welcome email:", error);
      return;
    }

    console.log("Welcome email sent:", data);
  } catch (err) {
    console.log("Failed to send welcome email:", err);
  }
};