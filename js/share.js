   // > Cargar SDK de forma asíncrona (directo de developers.facebook.com)
   ( function(d) {
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id))
         return;

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1&appId=376013602473921";
      ref.parentNode.insertBefore(js, ref);
   }(document) );
   
   // > Callback al cargarse FB SDK
   window.fbAsyncInit = function() {
      FB.init({
         appId : '376013602473921',
         status : true,
         cookie : true,
         xfbml : true
      });
   };
   
   // > Realizar login en Facebook
   function fb_login(b) {
      $(b).remove();
   
      FB.login(function(response) {
         if (response.authResponse) {
            FB.api('/me', function(me) {
               if (me.username) {
                  var fb_img = 'http://graph.facebook.com/' + me.username + '/picture/'
   
                  Reveal.navigateTo(1, 0);
   
                  slides_intro();
               }
            });
         }
      });
   }
   
   // > Compartir Héroes por la Vida en Facebook
   function fb_share() {
      FB.ui(
         {
            method : 'feed',
            link : 'http://donacion-organos.lesmo.com.mx/',
            picture : 'http://donacion-organos.lesmo.com.mx/img/logo.png',
            name : 'Héroes por la Vida',
            caption : 'Donar tus órganos puede salvar una vida.',
            description : 'Yo ya soy un Héroe por la Vida ¿y tú? ¡Qué esperas!'
         },
         function(response) {
         }
      );
   }
   
   // > Compartir Héroes por la Vida en Twitter
   function tw_share() {
      tw_url  = 'https://www.twitter.com/share?url=http%3A%2F%2Fdonacion-organos.lesmo.com.mx';
      tw_url += '&text=Yo%20ya%20soy%20un%20H%E9roe%20por%20la%20Vida%20%BFy%20t%FA%3F%20%A1Qu%E9%20esperas%21';
      //tw_url += 'via='
      tw_url += '&lang=es';
      
      window.open(tw_url, 'Sé un Héroe por la Vida en Twitter', 'status=0, toolbar=0, menubar=0, resizable=0, height=440, width=600');
   }