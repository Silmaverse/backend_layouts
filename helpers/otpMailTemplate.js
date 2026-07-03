const otpmailTemp = function otpmailTemp (otp){
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;">
            <tr>
              <td align="center">
                <h1 style="color:#2563eb;margin:0;">
                  School Management System
                </h1>

                <p style="font-size:16px;color:#555;margin-top:25px;">
                  Hello,
                </p>

                <p style="font-size:16px;color:#555;line-height:24px;">
                  Use the following One-Time Password (OTP) to verify your email address.
                </p>

                <div style="margin:35px 0;">
                  <span style="
                    display:inline-block;
                    font-size:34px;
                    letter-spacing:8px;
                    font-weight:bold;
                    color:#2563eb;
                    background:#eef4ff;
                    padding:18px 35px;
                    border-radius:8px;">
                    ${otp}
                  </span>
                </div>

                <p style="color:#666;font-size:15px;">
                  This OTP will expire in <strong>5 minutes</strong>.
                </p>

                <p style="color:#666;font-size:15px;">
                  If you didn't request this code, you can safely ignore this email.
                </p>

                <hr style="margin:35px 0;border:none;border-top:1px solid #eee;">

                <p style="font-size:13px;color:#999;">
                  This is an automated email. Please do not reply.
                </p>

                <p style="font-size:13px;color:#999;">
                  © ${new Date().getFullYear()} School Management System
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
};

module.exports = otpmailTemp;
