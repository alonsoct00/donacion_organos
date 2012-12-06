   var pivot_animation_speed    = 600;
   var pivot_animation_distance = '400';
 
   function pivot_animate_in_out(pivot_location, in_out_from, in_out, on_finish) {
      var pivot_position_to_animate = {
         left : 'top',
         right : 'bottom',
         top : 'right',
         bottom : 'left'
      };
      
      pivot_mouseout('.pivot.' + pivot_location + ' img');
      
      if ( pivot_location == 'top' )
         $('.pivot.top').css('right', '20');
      else if ( pivot_location == 'bottom' )
         $('.pivot.top').css('left', '20');
         
      var location_animation, opacity_animation, pivot_animation_position = pivot_position_to_animate[pivot_location];
      
      if ( in_out == 'in' ) {
         if ( in_out_from == 'left' ) {
            $('.pivot.' + pivot_location).css(pivot_animation_position, '-' + pivot_animation_distance + 'px');
            
            location_animation = '+=' + pivot_animation_distance;
            opacity_animation = 1;
         } else if ( in_out_from == 'right' ) {
            $('.pivot.' + pivot_location).css(pivot_animation_position, pivot_animation_distance + 'px');
            
            location_animation = '-=' + pivot_animation_distance;
            opacity_animation = 1;
         }
      } else if ( in_out == 'out' ) {
         if ( in_out_from == 'left' ) {
            location_animation = '-=' + pivot_animation_distance;
            opacity_animation = 0;
         } else if ( in_out_from == 'right' ) {
            location_animation = '+=' + pivot_animation_distance;
            opacity_animation = 0;
         }
      }
      
      if ( pivot_animation_position == 'top' ) {
         $('.pivot.' + pivot_location).animate(
            {
               top : location_animation,
               opacity : opacity_animation
            },
            { complete : on_finish, duration: pivot_animation_speed }
         );
      } else if ( pivot_animation_position == 'bottom' ) {
         $('.pivot.' + pivot_location).animate(
            {
               bottom : location_animation,
               opacity : opacity_animation
            },
            { complete : on_finish, duration: pivot_animation_speed }
         );
      } else if ( pivot_animation_position == 'left' ) {
         $('.pivot.' + pivot_location).animate(
            {
               left : location_animation,
               opacity : opacity_animation
            },
            { complete : on_finish, duration: pivot_animation_speed }
         );
      } else if ( pivot_animation_position == 'right' ) {
         $('.pivot.' + pivot_location).animate(
            {
               right : location_animation,
               opacity : opacity_animation
            },
            { complete : on_finish, duration: pivot_animation_speed }
         );
      }
   }
   
// ! - Anima los Pivots según al Pivot que se pondrá en foco
   function pivot_animate_focus(pivot_location) {
      var pivots_prev_html = {
         left : $('.pivot.left').html(),
         right : $('.pivot.right').html(),
         top : $('.pivot.top').html(),
         bottom : $('.pivot.bottom').html()
      }

      switch ( pivot_location ) {
         case 'left' :
            pivot_animate_in_out('left', 'right', 'out', function() {      
               $('.pivot.left').html(pivots_prev_html.top);
               pivot_animate_in_out('left', 'left', 'in');
            });
            
            pivot_animate_in_out('bottom', 'right', 'out', function() {
               $('.pivot.bottom').html(pivots_prev_html.left);
            });
            
            pivot_animate_in_out('right', 'right', 'out', function() {
               $('.pivot.right').html(pivots_prev_html.bottom);
               pivot_animate_in_out('right', 'left', 'in');
            });
            
            pivot_animate_in_out('top', 'right', 'out', function() {
               $('.pivot.top').html(pivots_prev_html.right);
               pivot_animate_in_out('top', 'left', 'in');
               
               pivots_bind_mouse_events();
            });
            break;
            
         case 'bottom' :
            pivot_animate_in_out('left', 'left', 'out', function() {      
               $('.pivot.left').html(pivots_prev_html.right);
               pivot_animate_in_out('left', 'right', 'in');
            });
            
            pivot_animate_in_out('bottom', 'left', 'out');
            
            pivot_animate_in_out('right', 'left', 'out', function() {
               $('.pivot.right').html(pivots_prev_html.left);
               pivot_animate_in_out('right', 'right', 'in');
            });
            
            pivot_animate_in_out('top', 'left', 'out', function() {
               pivot_animate_in_out('top', 'right', 'in');
               
               pivots_bind_mouse_events();
            });
            break;
            
         case 'right' :
            pivot_animate_in_out('right', 'left', 'out', function() {
               $('.pivot.right').html(pivots_prev_html.bottom);
               pivot_animate_in_out('right', 'right', 'in');
            });
            
            pivot_animate_in_out('top', 'left', 'out', function() {
               $('.pivot.top').html(pivots_prev_html.right);
               
            });

            pivot_animate_in_out('left', 'left', 'out', function() {
               $('.pivot.left').html(pivots_prev_html.top);
               pivot_animate_in_out('left', 'right', 'in');
            });

            pivot_animate_in_out('bottom', 'left', 'out', function() {
               $('.pivot.bottom').html(pivots_prev_html.left);
               pivot_animate_in_out('bottom', 'right', 'in');
               
               pivots_bind_mouse_events();
            });

            break;
            
         case 'top' :
            pivot_animate_in_out('left', 'right', 'out', function() {      
               $('.pivot.left').html(pivots_prev_html.right);
               pivot_animate_in_out('left', 'left', 'in');
            });
            
            pivot_animate_in_out('bottom', 'right', 'out', function() {
               pivot_animate_in_out('bottom', 'left', 'in');
            });
            
            pivot_animate_in_out('right', 'right', 'out', function() {
               $('.pivot.right').html(pivots_prev_html.left);
               pivot_animate_in_out('right', 'left', 'in');
            });
            
            pivot_animate_in_out('top', 'left', 'out', function() {
               pivots_bind_mouse_events();
            });
            
            break;
      }
   }
   
   function pivot_mouseover(img) {
      url = $(img).attr('src');
      url = url.replace('.off.', '.on.');
      
      $(img).attr('src', url);
   }
   
   function pivot_mouseout(img) {
      url = $(img).attr('src');
      url = url.replace('.on.', '.off.');
      
      $(img).attr('src', url);
   }
   
   function pivots_bind_mouse_events() {
      $('.pivot img').attr('onmouseover', 'pivot_mouseover(this)');
      $('.pivot img').attr('onmouseout', 'pivot_mouseout(this)');
      
      $('.pivot.left img').attr('onclick', 'pivot_animate_focus("left")');
      $('.pivot.right img').attr('onclick', 'pivot_animate_focus("right")');
      $('.pivot.top img').attr('onclick', 'pivot_animate_focus("top")');
      $('.pivot.bottom img').attr('onclick', 'pivot_animate_focus("bottom")');
   }

   pivots_bind_mouse_events();
   $('.pivot.top').css('opacity', 0);