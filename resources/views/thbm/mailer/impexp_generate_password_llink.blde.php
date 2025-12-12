<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <style>
        .button {
            display: inline-block;
            padding: 12px 20px;
            background: #0d6efd;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
        }

        .container {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        .footer {
            margin-top: 20px;
            color: #777;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Welcome to Imp-Exp Portal</h2>

        <p>Hello,</p>

        <p>Your Imp-Exp account has been created successfully.</p>

        <p>Please click the button below to generate your login password:</p>

        <p>
            <a href="{{ $url }}" class="button">Set Your Password</a>
        </p>

        <p>This link will expire in <strong>60 minutes</strong>.</p>

        <hr>

        <p class="footer">If you did not request this, kindly ignore this email.</p>
    </div>
</body>

</html>