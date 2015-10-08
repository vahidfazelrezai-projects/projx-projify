window.fbAsyncInit = function() {
    FB.init({
        appId      : '1503156013328875',
        xfbml      : true,
        version    : 'v2.5'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebookLogin() {
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				var fbid = response.id;
				projify(fbid);
			});
		} else {
			console.log('User cancelled login or did not fully authorize.');
		}
	});
}

function projify(fbid) {

    var imgLoaded = [false, false];

    var profile = new Image();
    profile.crossOrigin = "Anonymous";
    profile.src = "http://graph.facebook.com/" + fbid + "/picture?width=320&height=320";
    profile.onload = function() {
        imgLoaded[0] = true;
        draw();
    };

    var overlay = new Image();
    overlay.crossOrigin = "Anonymous";
    overlay.src = './assets/img/overlay.png';
    overlay.onload = function() {
        imgLoaded[1] = true;
        draw();
    };

    var draw = function() {
        if (imgLoaded[0] && imgLoaded[1]) {
            $('#placeholder').fadeOut();

            var canvas = $('#fb-img').get(0);
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "overlay";

            ctx.drawImage(profile, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#7238C0";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.globalCompositeOperation = "destination-over";

            ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

            var img = canvas.toDataURL('image/png');
            $("#download").attr("href", img);
        }
    }
}
