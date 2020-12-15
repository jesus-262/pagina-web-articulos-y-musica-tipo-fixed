var boton = [document.getElementsByClassName('control_left'),document.getElementsByClassName('control_right')];
var menu = document.getElementsByTagName("nav");
var pagina = (getUrlVars()["pagina"])? parseInt(getUrlVars()["pagina"]) : 1;
var contenedoresImg = document.getElementsByClassName("contentImg");
var imgActual = 0, cuadroActual = 0;
//window.location = window.location.pathname + "?pagina="+()

var headerMovilHeight = '0px';
function cargarCanciones(){

	cover = $("#audioPlayer img")[0];
	lista = $("#musicList ul");
	player = $("#audioPlayer audio")[0];

	for (var i = 0; i < contenido.canciones.length; i++) {
		if(i == 0){
			lista.append("<li class='playing' data-src='"+contenido.canciones[i].uri+"' data-cover='"+contenido.canciones[i].cover+"' onclick='playSong(this); '>"+contenido.canciones[i].titulo+"</li>");
			player.src = contenido.canciones[i].uri;
			cover.src = contenido.canciones[i].cover;
		}else{
			
			lista.append("<li data-src='"+contenido.canciones[i].uri+"' data-cover='"+contenido.canciones[i].cover+"'  onclick='playSong(this); '>"+contenido.canciones[i].titulo+"</li>");
		}
	};
}

function desplegar(){
	if(menu[0].style.left == "-40%" || menu[0].style.left == ""){
		$('nav').animate({
			left: "0%"
		});
		$('nav').css({
			transition: '0s',
			top: '80px'
		});
		headerMovilHeight = $('.header')[0].style.height;
		console.log(headerMovilHeight);
		$('.header')[0].style.height = "80px";
	}else{
		$('nav').animate({
			left: "-40%"
		});
		$('nav').css({
			transition: '0s'
		});
	}
}

function cargarSlider(){
$(".slides").slidesjs({
    play: {
      active: true,
        // [boolean] Generate the play and stop buttons.
        // You cannot use your own buttons. Sorry.
      effect: "slide",
        // [string] Can be either "slide" or "fade".
      interval: 3000,
        // [number] Time spent on each slide in milliseconds.
      auto: true,
        // [boolean] Start playing the slideshow on load.
      swap: true,
        // [boolean] show/hide stop and play buttons
      pauseOnHover: false,
        // [boolean] pause a playing slideshow on hover
      restartDelay: 2500
        // [number] restart delay on inactive slideshow
    }
  });
}

function cargarNoticias(){
	var index = (contenido.noticias.length >= 5)? 5 : contenido.noticias.length;
	if(pagina > 1 && contenido.noticias.length - (pagina-1)*5 >= 5){
		index = 5;
	}else if(pagina > 1){
		index = contenido.noticias.length - (pagina-1)*5;
	}
	for (var i = 0; i < index; i++) {
		crearNoticia(contenido.noticias[i].tipoN,contenido.noticias[(pagina-1)*5 + i]);
	};
	$(".noticias")[0].innerHTML += '<div class="oldPost" onclick="previousPosts();" > Publicaciones anteriores </div>';
	$(".noticias")[0].innerHTML += '<div class="newPost" onclick="nextPosts();" > Publicaciones siguientes</div>';
}

function crearNoticia(tipoN,news){
	switch(tipoN){
		case "fullW":
			var articulo = document.createElement("article");
			articulo.className ="fullW";

			var image_w = document.createElement("div");
			image_w.className ="image_w";
			var img = document.createElement("img");
			img.src = news.img;

			image_w.appendChild(img);

			var noticia_w = document.createElement("div");
			noticia_w.className ="noticia_w";
			var titulo = document.createElement("div");
			titulo.className ="titulo";
			titulo.innerText = news.titulo;
			var noticia = document.createElement("div");
			noticia.className ="noticia";
			noticia.innerText = news.contenido;

			noticia_w.appendChild(titulo);
			noticia_w.appendChild(noticia);

			articulo.appendChild(image_w);
			articulo.appendChild(noticia_w);

			latI = document.getElementById('lateralIzquierdo');
			latI.getElementsByClassName("noticias")[0].appendChild(articulo);

		break;
		default:

	}
}

function nextPosts(){
	pagina = pagina+1;
	document.location = document.location.pathname + "?pagina="+ pagina;
}

function previousPosts(){
	pagina = pagina-1;
	document.location = document.location.pathname + "?pagina="+ pagina;
}

$(function(){

	cargarCanciones();

	cargarNoticias();
	cargarSlider();

	$("#audioPlayer img").click(function(){
		if(player.paused){
			player.play();
		}else{
			player.pause();
		}
	});

	
	$(window).resize(function(){
		if($(window).width() > 833){
			menu[0].style.left = "-40%";
		}
	});

	if(pagina == 1){
		$('.oldPost')[0].style.display = "none";
	}else if(contenido.noticias.length - (pagina-1)*5 <= 5){
		$('.newPost')[0].style.display = "none";
	}

	$(window).scroll(function(){
		if($(this).scrollTop() > 0){
			$('.ir_arriba').slideDown(300);
		}else{
			$('.ir_arriba').slideUp(300);
		}
		if($(window).scrollTop() < 400 && $(window).width() <= 833){
			$('.header')[0].style.height = 80-40*$(window).scrollTop()/400 +"px";
			$('nav')[0].style.top = $('.header')[0].style.height;
			$('nav').css({
				transition: '0.2s'
			});
			headerMovilHeight = $('.header')[0].style.height;
		}else{
			$('.header')[0].style.height = headerMovilHeight;
		}
	});

	$('.ir_arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
});

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

function entro(obj){
	//boton[0][0].style.display = "block";
	//boton[1][0].style.display = "block";
	/*$('.audio_ui_control').animate({
		width: "toggle"
	});*/
	boton[0][0].style.width = "20%";
	boton[1][0].style.width = "20%";
}

function salio(obj){
	///boton[0][0].style.display = "none";
	//boton[1][0].style.display = "none";
	/*$('.audio_ui_control').animate({
		width: "toggle"
	});*/
	boton[0][0].style.width = "0%";
	boton[1][0].style.width = "0%";
}

function siguiente(obj){
	var song = $(".playing");	
	if(song.index() == lista[0].children.length-1){
		playSong(lista[0].children[0]);
	}else{
		playSong(lista[0].children[song.index()+1]);
	}
}

function anterior(obj){
	var song = $(".playing");	
	if(song.index() == 0){
		playSong(lista[0].children[lista[0].children.length-1]);
	}else{
		playSong(lista[0].children[song.index()-1]);
	}
}

function playSong(obj){	
		player.src= $(obj).data("src");
		cover.src=$(obj).data("cover");
		player.play();
		$(".playing").each(function(){
			$(this).removeClass("playing");
		});
		$(obj).addClass("playing");
}


