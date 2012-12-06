// > La sección (órgano) actual
var seccion_actual = 'corazon';

// > Asociación de nombre código a nombre HTML (casing correcto y acentos)
var codigo_html = {
   'corazon' : 'Corazón',
   'higado'  : 'Hígado',
   'pulmon'  : 'Pulmón',
   'rinon'   : 'Riñon'
}

// > Los resultados (sumatorias) de cada sección
var resultados = {
   'corazon' : 0,
   'higado'  : 0,
   'pulmon'  : 0,
   'rinon'   : 0
}

// > Las respuestas de cada sección, en true o false (null al principio)
var respuestas = {
   'corazon' : [null, null, null],
   'higado'  : [null, null, null],
   'pulmon'  : [null, null, null],
   'rinon'   : [null, null, null]
}

// > Las preguntas de cada sección
var preguntas = {
   'corazon' : [
      '¿Eres una persona que se ejercita poco?',
      '¿Tú o alguien de tu familia padece hipertensión?',
      '¿Te diagnosticaron diabetes?'
   ],
   'higado'  : [
      '¿Ingieres alcohol con frecuencia?',
      '¿Padeciste hepatitis?',
      '¿Te han diagnosticado colesterol alto?'
   ],
   'pulmon'  : [
      '¿Fumas más de 5 cigarrillos al dí­a?',
      '¿Trabajas con polvo o gases?',
      '¿Fumas pipas, puros o similares?'
   ],
   'rinon'   : [
      '¿Bebes menos de litro y medio de agua al día?',
      '¿Pasas sentado o de pie muchas horas al dí­a?',
      '¿Ingieres regularmente bebidas alcóholicas?'
   ]
}

// > Mensajes de estado de cada sección
var mensajes_estado = {
   'corazon' : [
      '#SigueDonandoVida a tu corazón con buenos hábitos de alimentación y ejercicio.',
      '#DonaMásVida a tu corazón consumiendo 5 frutas y verduras al día. ¡Activate! El corazón es un músculo y necesita ejercitarse.'
   ],
   'higado'  : [
      '#SigueDonandoVida a tu hígado con buenos hábitos de alimentación y actividad fisica.',
      '#DonaMásVida a tu hígado con buenos hábitos de alimentación y actividad física.'
   ],
   'pulmon'  : [
      '#SigueDonandoVida a tus pulmones manteniéndote alejado del humo del tabajo y con mínimo 30 min. de actividad física al dia.',
      '#DonaMásVida a tus pulmones eliminando o disminuyendo tu consumo de tabaco y activándote con ejercicio diario.'
   ],
   'rinon'   : [
      '#SigueDonandoVida a tus riñones tomando al menos 1.5 lts de agua al día y haciendo ejercicio todos los días.',
      '#DonaMásVida a tus riñones evitando el consumo de bebidas alcohólicas. Toma por lo menos 1.5 lts de agua al día y haciendo ejercicio todos los dias.'
   ]
}

/* Cargar respuestas de la sección actual (determinada por seccion_actual) */
function cargar_respuestas() {
   if ( respuestas[seccion_actual][0] === true )
      $('#r1s').attr('checked','checked');
   else if ( respuestas[seccion_actual][0] === false )
      $('#r1n').attr('checked','checked');
   else {
      $('#r1s').removeAttr('checked');
      $('#r1n').removeAttr('checked');
   }

   if ( respuestas[seccion_actual][1] === true )
      $('#r2s').attr('checked','checked');
   else if ( respuestas[seccion_actual][1] === false )
      $('#r2n').attr('checked','checked');
   else {
      $('#r2s').removeAttr('checked');
      $('#r2n').removeAttr('checked');
   }

   if ( respuestas[seccion_actual][2] === true )
      $('#r3s').attr('checked','checked');
   else if ( respuestas[seccion_actual][2] === false )
      $('#r3n').attr('checked','checked');
   else {
      $('#r3s').removeAttr('checked');
      $('#r3n').removeAttr('checked');
   }            
}

/* Cargar preguntas de la sección actual (determinada por seccion_actual) */
function cargar_preguntas() {
   $('#q1 label').text(preguntas[seccion_actual][0]);
   $('#q2 label').text(preguntas[seccion_actual][1]);
   $('#q3 label').text(preguntas[seccion_actual][2]);            
}

/* Guardar respuestas de la sección actual (determinada por seccion_actual) */
function guardar_respuestas() {
   if ( $('#r1s').is(':checked') )
      respuestas[seccion_actual][0] = true;
   else if ( $('#r1n').is(':checked') )
      respuestas[seccion_actual][0] = false;

   if ( $('#r2s').is(':checked') )
      respuestas[seccion_actual][1] = true;
   else if ( $('#r2n').is(':checked') )
      respuestas[seccion_actual][1] = false;

   if ( $('#r3s').is(':checked') )
      respuestas[seccion_actual][2] = true;
   else if ( $('#r3n').is(':checked') )
      respuestas[seccion_actual][2] = false;
}

/* Calcular resultados de la sección actual (determinada por seccion_actual) */
function calcular_resultados() {         
   // > Sumatoria total (para el #man)
   var suma_total = 0;
   
   // > Realizar sumatoria por órgano
   for ( var seccion in resultados ) {
      // > Realizar sumatoria
      resultados[seccion] = 0;
   
      if ( respuestas[seccion][0] === true )
         resultados[seccion] += 10;
      else if ( respuestas[seccion][0] === false )
         resultados[seccion] += 0;
      else continue;
      
      if ( respuestas[seccion][1] === true )
         resultados[seccion] += 10;
      else if ( respuestas[seccion][1] === false )
         resultados[seccion] += 0;
      else continue;

      if ( respuestas[seccion][2] === true )
         resultados[seccion] += 10;
      else if ( respuestas[seccion][2] === false )
         resultados[seccion] += 0;
      else continue;
      
      // > Agregar a la suma total
      suma_total += resultados[seccion];
      
      // > Eliminar clases de color del icono de resultado
      $('#icono-resultado-' + seccion).removeClass('icono-resultado-green');
      $('#icono-resultado-' + seccion).removeClass('icono-resultado-yellow');
      $('#icono-resultado-' + seccion).removeClass('icono-resultado-red');
      
      // > Pintar icono de resultado
      if ( resultados[seccion] <= 10 ) {
         $('#icono-resultado-' + seccion).addClass('icono-resultado-green');
      } else if ( resultados[seccion] <= 20 ) {
         $('#icono-resultado-' + seccion).addClass('icono-resultado-yellow');
      } else {
         $('#icono-resultado-' + seccion).addClass('icono-resultado-red');
      }
   }
   
   // > Establecer mensaje de resultado
   $('#resultado-text').css('opacity', 0);
   if ( resultados[seccion_actual] <= 20 )
      $('#container-recomendaciones p').html(mensajes_estado[seccion_actual][0]);
   else
      $('#container-recomendaciones p').html(mensajes_estado[seccion_actual][1]);
   $('#container-recomendaciones p').animate({opacity : 1});
   
   // > Eliminar clases de #man
   $('.man-overlay').removeClass('.happy');
   $('.man-overlay').removeClass('.neutral');
   $('.man-overlay').removeClass('.sad');
      
   // > Determinar qué mensaje motivacional mostrar
   if ( suma_total <= 30 ) {
      $('#container-man p').text('¡Qué saludable!');
	  $('.man-overlay').addClass('.happy');
   } else if ( suma_total <= 60 ) {
      $('#container-man p').text('No está mal');
	   $('.man-overlay').addClass('.neutral');
   } else if ( suma_total <= 90 ) {
      $('#container-man p').text('¡Cuidado!');
	  $('.man-overlay').addClass('.neutral');
   } else {
      $('#container-man p').text('¡Peligro!');
	  $('.man-overlay').removeClass('.sad');
   }
}

$(document).ready(function() {
   /** Eventos **/
   $('#container-botones div').click(function() {
      $('#container-preguntas').css('opacity', 0);
   
      guardar_respuestas();
      $('#container-botones #boton-' + seccion_actual + '-pressed').attr('id', 'boton-' + seccion_actual);
      
      var id = $(this).attr('id');
      seccion_actual = id.replace('boton-','').replace('-pressed','');
      
      if ( seccion_actual.indexOf('-pressed') > -1 ) {
         $(this).attr('id', 'boton-' + seccion_actual);
      } else {
         $(this).attr('id', 'boton-' + seccion_actual + '-pressed');
      }
      
      $('#organo').text(codigo_html[seccion_actual]);
      
      cargar_preguntas();
      cargar_respuestas();
      calcular_resultados();
      
      $('#container-preguntas').animate(
         { opacity : 1 },
         { duration : 200}
      );
   });
   
   $('input').click(function() {
      guardar_respuestas();
      calcular_resultados();
   });
   
   /** Inicializaciones **/
   $('#container-botones #boton-' + seccion_actual).click();
   $('#resultado-text').html('¡Contesta las preguntas para conocer tu estado de salud!');
});
