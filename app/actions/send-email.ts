"use server";

import nodemailer from "nodemailer";

export async function sendEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  // Configure transporter
  // Using environment variables for security
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // If no SMTP config is present, log to console (for development)
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      console.log("----------------------------------------");
      console.log("Mock Email Sending (SMTP config missing):");
      console.log("From:", email);
      console.log("Name:", name);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("----------------------------------------");
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: "Message received! (Dev mode: Check console)",
      };
    }

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address (often needs to be the authenticated user)
      replyTo: email, // Where you can reply to the user
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Your email address
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
