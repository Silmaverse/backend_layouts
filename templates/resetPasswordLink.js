const resetPassTemplate = function resetPass(name,resetLink){
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);">

<tr>
<td style="background:#2563eb;padding:25px;text-align:center;">
<h1 style="color:#ffffff;margin:0;">Reset Your Password</h1>
</td>
</tr>

<tr>
<td style="padding:40px;color:#333333;font-size:16px;line-height:1.6;">

<p>Hello <strong>${name}</strong>,</p>

<p>
We received a request to reset your password.
If you made this request, click the button below to create a new password.
</p>

<div style="text-align:center;margin:35px 0;">
<a href="${resetLink}"
style="
background:#2563eb;
color:#ffffff;
padding:15px 30px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
">
Reset Password
</a>
</div>

<p>
This password reset link will expire in <strong>15 minutes</strong>.
</p>

<p>
If the button doesn't work, copy and paste the following URL into your browser:
</p>

<p style="word-break:break-all;color:#2563eb;">
${resetLink}
</p>

<hr style="border:none;border-top:1px solid #e5e5e5;margin:30px 0;">

<p style="font-size:14px;color:#666;">
If you didn't request a password reset, you can safely ignore this email.
Your password will remain unchanged.
</p>

<p>
Thanks,<br>
<strong>Your App Team</strong>
</p>

</td>
</tr>

<tr>
<td style="background:#f8f8f8;padding:20px;text-align:center;color:#888;font-size:13px;">
© ${new Date().getFullYear()} Your App. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
}


module.exports=resetPassTemplate