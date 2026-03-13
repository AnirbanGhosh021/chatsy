export function createWelcomeEmailTemplates(name, clientURL){
  return `
  <div style="margin:0; padding:0; background:#f2f4f8; font-family:Arial, Helvetica, sans-serif;">
    
    <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#6366f1,#4f46e5); padding:30px; text-align:center;">
                <h1 style="color:white; margin:0;">Welcome to Chatsy 🎉</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; text-align:center;">
                <h2 style="margin-top:0; color:#333;">Hi ${name},</h2>

                <p style="font-size:16px; color:#555; line-height:1.6;">
                  We're excited to have you join <b>Chatsy</b>.  
                  Now you can start chatting with your friends and explore the platform.
                </p>

                <p style="font-size:16px; color:#555;">
                  Click the button below to start chatting.
                </p>

                <!-- Button -->
                <a href="${clientURL}" 
                style="display:inline-block; margin-top:20px; padding:14px 28px; 
                background:#4f46e5; color:#ffffff; text-decoration:none; 
                border-radius:8px; font-size:16px; font-weight:bold;">
                Start Chatting
                </a>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center;">
                <p style="font-size:13px; color:#777; margin:0;">
                  If you didn’t create this account, you can safely ignore this email.
                </p>

                <p style="font-size:12px; color:#aaa; margin-top:10px;">
                  © 2026 Chatsy. All rights reserved.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
  `;
}