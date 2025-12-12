<!DOCTYPE html>
<html>

<head>
    <title></title>
    <style>
        p span{
            text-align: justify;
        }
    </style>
</head>

<body style="background-color: #022759;">
    <h1>{{ $pwdGenLink['title'] }}</h1>
    <p>{{ $pwdGenLink['body'] }}</p>
    <div class="container">
        <div class="mail-text" style="background-color: #ffffff; padding:10px;">
            <h3 class="from-name" style="padding: 5px;">Dear Sir/Madam,</h3>
            <h3 class="wel-text" style="padding-top: 10px; font-size:15px;">Welcome to Transfer of Human Biological Material (THBM) online portal!</h3>
            <p style="padding-top: 10px; font-size:15px;">You may kindly generate the password to login into your account for submission of THBM application at the
                THBM portal.</p>
            <h2 class="text-white">To Generate Password, please click on the link below.</h2>
            <p><a href="{{ url('imp-exp/generate-password?id='.encrypt($pwdGenLink['pwdGenLink'])) }}" class="link-generate-password" style="color:#022759;">{{ url('imp-exp/generate-password') }}</a></p>
            <p style="padding-top: 10px; font-size:15px;">After setting the password, you may submit your Application to THBM Secretariat for obtaining NOC for
                Export of human biological material through online portal <a
                    href="www.tbm.icmr.gov.in ">www.tbm.icmr.gov.in </a> </p>
            <p style="padding-top: 10px; font-size:15px;"><span style="font-size: 17px;"><strong>Important Note:</strong> </span>This is a system generated email. Please do not reply to this email. <br/>For any further correspondence may please write at <a href="http://thbm.hq@icmr.gov.in" target="_blank" rel="noopener noreferrer">thbm.hq@icmr.gov.in</a> OR call us at 011- 26589492.
            </p>


            <div class="row">
                <div class="col-md-3 col-lg-offset-3">
                    <div class="footer-text">
                        <h3 style="padding: 10px;">With regards</h3>
                        <p style="padding-top: 10px;">
                            <span style="font-size: 17px;"><strong>THBM Team</strong></span><br> International Health Division (IHD)<br>
                            Indian Council of Medical Research<br>
                            Department of Health Research<br>
                            Ministry of Health & Family Welfare<br>
                            Government of India<br>
                            V. Ramalingaswami Bhawan, P.O. Box No. 4911<br>
                            Ansari Nagar, New Delhi - 110029, India</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

