<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{asset('css/reset.css')}}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
    <link rel="icon" type="image/x-icon" href="{{asset('img/favicon.ico')}}">
    <title>Reset password</title>
</head>

<body>
<div id="wrapper">
    <div class="login" id="form">
        <h1 class="heading">New Password</h1>
        <input type="hidden" class="input" id="email" value="{{$email}}">
        <div class="group">
            <i class="fas fa-key"></i>
            <input type="password" class="input" id="password" placeholder="New password">
            <div id="eye">
                <i class="far fa-eye"></i>
            </div>
        </div>
        <div class="group">
            <i class="fas fa-key"></i>
            <input type="password" class="input" id="password_confirmation" placeholder="Confirm new password">
            <div id="eye">
                <i class="far fa-eye"></i>
            </div>
        </div>

        <input name="token" type="hidden" id="token" value="{{$token}}">
        <input type="submit" value="Reset Password" class="submit">
    </div>

    <div class="login" id="complete" style="padding: 6rem 0 6rem 0; display: none">
        <h1 class="heading" style="margin-bottom: 0">Reset password successfully</h1>
    </div>
</div>

</body>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="{{asset('js/app.js')}}"></script>
<script>
    $('.submit').on('click', function () {
        const email = $('#email').val();
        const password = $('#password').val();
        const password_confirmation = $('#password_confirmation').val();
        const token = $('#token').val();

        const data = JSON.stringify({
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            token: token
        });

        $.ajax({
            url: '{{route('password.update')}}',
            method: 'post',
            data: data,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            success: function (data) {
                $('#form').hide();
                $('#complete').show();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                const err = eval("(" + XMLHttpRequest.responseText + ")");
                alert(err.message);
            }
        });
    });
</script>
</html>
