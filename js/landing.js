   function css_crossbrowser_transform(css) {
      return {
         '-webkit-transform' : css,
         '-moz-transform' : css,
         '-ms-transform' : css,
         'transform' : css
      }
   }
   
   // > Darle foco a las slides
   function focus_slides() {
      $('#landing').fadeOut(400, function() {
         clearInterval(clock_ding_interval);
         $('#landing').remove();
      });
   }

   // > Mostrar "zoom-out" de slides
   function slides_show_overview() {
      $('.reveal').addClass('overview');
      
      // > Centro
      $('#inicio').css(
         css_crossbrowser_transform('rotateZ(0deg) translate3d(0, 0, -960px)')
      );
      
      // > Izquierda
      $('#difusion').css(
         css_crossbrowser_transform('rotateZ(90deg) translate3d(216px, 730px, -960px)')
      );
      
      // > Derecha
      $('#prevencion').css(
         css_crossbrowser_transform('rotateZ(-90deg) translate3d(-164px, 780px, -960px)')
      );
      
      // > Abajo
      $('#se-donante').css(
         css_crossbrowser_transform('rotateZ(0deg) translate3d(0, 546px, -960px)')
      );
   }
   
   // > Hacer "zoom-in" a las slides
   function slides_close_overview() {
      $('.reveal').removeClass('overview');
      
      // > Centro
      $('#inicio').css(
         css_crossbrowser_transform('')
      );
      
      // > Izquierda
      $('#difusion').css(
         css_crossbrowser_transform('')
      );
      pivot_animate_in_out('left', 'left', 'in');
      
      // > Derecha
      $('#prevencion').css(
         css_crossbrowser_transform('')
      );
      pivot_animate_in_out('right', 'left', 'in');
      
      // > Abajo
      $('#se-donante').css(
         css_crossbrowser_transform('')
      );
      pivot_animate_in_out('bottom', 'left', 'in');
   }
   
   // > Realizar la animación de introducción a la página (zoom-out y asi)
   function slides_intro() {
      focus_slides();
      Reveal.navigateTo(1,0);
      slides_show_overview();   
      setTimeout(function() { slides_close_overview(); }, 1500);
   }
   
   /*********** CLOCK ***********/
   var clock_ding_milliseconds_interval = 70;
   var clock_ding_interval;
   
   setTimeout(function() {
      $('#ding').css('opacity', 1);
      
      clock_ding_interval = setInterval(function() {
         random_deg = Math.floor(Math.random()* 21) + 10;
         random_dir = Math.floor(Math.random()* 101) > 50;
      
         $('#clock').css(
            css_crossbrowser_transform('rotateZ(' + (random_dir ? '' : '-') + random_deg + 'deg)')
         );
         
         random_deg = Math.floor(Math.random()* 11) + 10;
         random_dir = Math.floor(Math.random()* 101) > 30;
         
         $('#ding').css(
            css_crossbrowser_transform('rotateZ(' + (random_dir ? '' : '-') + random_deg + 'deg)')
         );
      }, clock_ding_milliseconds_interval);
      
      $('#landing .right').fadeOut(200, function() {
         $('#landing .right').append(
            '<br /><a href="javascript:fb_login();"><img src="img/landing/fb_login.png" alt ="Login con Facebook" width="177" height="36" /></a>'
         );
         $('#landing #square').attr('src', 'img/landing/se_termina_el_tiempo.png');
         $('#landing .right').delay(400).fadeIn(600);
      });
   }, 4000);  
   
   $('.pivot').css('opacity', 0);
   $('#ding').css('opacity', 0);