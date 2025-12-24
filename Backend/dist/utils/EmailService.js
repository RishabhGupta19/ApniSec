import { resend } from "../config/resend.js";
import { ENV } from "../config/env.js";
export class EmailService {
    static async send({ to, subject, html, }) {
        try {
            await resend.emails.send({
                from: ENV.EMAIL_FROM,
                to,
                subject,
                html,
            });
        }
        catch (err) {
            console.error("Email send failed:", err);
        }
    }
    // Base email template wrapper
    static template(content) {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ApniSec</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f7;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">ApniSec</h1>
                    <p style="margin: 8px 0 0 0; color: #e0e7ff; font-size: 14px;">Security Management Platform</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    ${content}
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                      © ${new Date().getFullYear()} ApniSec. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      This email was sent from ApniSec Security Platform
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;
    }
    // ✅ Welcome email
    static async welcome(email) {
        const content = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background-color: #f0fdf4; padding: 12px; border-radius: 50%; margin-bottom: 20px;">
          <span style="font-size: 40px;">🎉</span>
        </div>
      </div>
      <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600; text-align: center;">
        Welcome to ApniSec!
      </h2>
      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
        Your account has been successfully created and you're ready to start managing security issues and vulnerabilities.
      </p>
      <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">
          <strong>Getting Started:</strong><br>
          • Set up your security profile<br>
          • Configure your notification preferences<br>
          • Start tracking vulnerabilities
        </p>
      </div>
      <div style="text-align: center; margin-top: 30px;">
        <a href="http://localhost:8080/dashboard" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px;">
          Go to Dashboard
        </a>
      </div>
    `;
        return this.send({
            to: email,
            subject: "Welcome to ApniSec 🎉",
            html: this.template(content),
        });
    }
    // ✅ Password reset email
    static async reset(email, token) {
        const resetUrl = `http://localhost:8080/reset-password?token=${token}`;
        const content = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background-color: #fef3c7; padding: 12px; border-radius: 50%; margin-bottom: 20px;">
          <span style="font-size: 40px;">🔒</span>
        </div>
      </div>
      <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600; text-align: center;">
        Reset Your Password
      </h2>
      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
        We received a request to reset your password. Click the button below to create a new password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px;">
          Reset Password
        </a>
      </div>
      <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.5;">
          <strong>Important:</strong> This link will expire in 15 minutes for security reasons.
        </p>
      </div>
      <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
        If you didn't request a password reset, please ignore this email or contact support if you have concerns.
      </p>
    `;
        return this.send({
            to: email,
            subject: "Reset Your Password - ApniSec",
            html: this.template(content),
        });
    }
    // ✅ Issue created email
    static async issueCreated(email, issue) {
        const typeColors = {
            vulnerability: { bg: "#fef2f2", text: "#991b1b", icon: "🔴" },
            bug: { bg: "#fef3c7", text: "#92400e", icon: "🐛" },
            security: { bg: "#fef2f2", text: "#991b1b", icon: "🛡️" },
            default: { bg: "#f3f4f6", text: "#374151", icon: "📋" },
        };
        const typeStyle = typeColors[issue.type.toLowerCase()] || typeColors.default;
        const content = `
    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600;">
  New Issue Created
</h2>
<p style="margin: 0 0 25px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
  A new security issue has been created and assigned to your attention.
</p>

<table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); margin-bottom: 25px;">
  <thead>
    <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <th style="padding: 18px 20px; text-align: left; color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Issue Type</th>
      <th style="padding: 18px 20px; text-align: left; color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Title</th>
      <th style="padding: 18px 20px; text-align: left; color: #ffffff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #fafbfc;">
      <td style="padding: 20px; vertical-align: top; border-right: 1px solid #e5e7eb; width: 20%;">
        <span style="display: inline-block; background-color: ${typeStyle.bg}; color: ${typeStyle.text}; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          ${typeStyle.icon} ${issue.type}
        </span>
      </td>
      <td style="padding: 20px; vertical-align: top; color: #1f2937; font-size: 16px; font-weight: 600; border-right: 1px solid #e5e7eb; width: 30%;">
        ${issue.title}
      </td>
      <td style="padding: 20px; vertical-align: top; color: #4b5563; font-size: 14px; line-height: 1.7; width: 50%;">
        ${issue.description}
      </td>
    </tr>
  </tbody>
</table>

      
    `;
        return this.send({
            to: email,
            subject: `New Issue: ${issue.title}`,
            html: this.template(content),
        });
    }
    // ✅ Profile updated email
    static async profileUpdated(email) {
        const content = `
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; background-color: #dbeafe; padding: 12px; border-radius: 50%; margin-bottom: 20px;">
          <span style="font-size: 40px;">✅</span>
        </div>
      </div>
      <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 600; text-align: center;">
        Password Updated Successfully
      </h2>
      <p style="margin: 0 0 15px 0; color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
        Your ApniSec account password was changed successfully. The change are now active on your account.
      </p>
      <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.5;">
          <strong>Security Tip:</strong> If you didn't make these changes, please contact our support team immediately.
        </p>
      </div>
      
    `;
        return this.send({
            to: email,
            subject: "Your password has been changed - ApniSec",
            html: this.template(content),
        });
    }
}
