/*
    Developed by: Fabian Marin 
    date: 31/01/2012

    This is my firts html5 game exercice
    I hope you enjoy!!!!

    fabian-guitar@hotmail.com
*/


var _Game = null;

//Se indica la funcion q se quiere ejecutar una vez este todo el codigo cargado
window.onload = init;

$(document).keydown(teclaPresionada);
$(document).keyup(teclaLiberada);

//constantes teclado
var FLECHA_IZQUIERDA = 37;
var FLECHA_DERECHA = 39;
var FLECHA_ARRIBA = 38;
var FLECHA_ABAJO = 40;

//Crea una instancia del objeto Game y ejecuta el metodo initGame
function init() {
    new Game().initGame();
}

function teclaLiberada(teclado) {
    if (teclado.keyCode == FLECHA_DERECHA) {
        _Game.moverDerecha = false;
    }
    else if (teclado.keyCode == FLECHA_IZQUIERDA) {
        _Game.moverIzquierda = false;
    }
    else if (teclado.keyCode == FLECHA_ARRIBA) {
        _Game.moverArriba = false;
    }
    else if (teclado.keyCode == FLECHA_ABAJO) {
        _Game.moverAbajo = false;
    }
}

function teclaPresionada(teclado) {
    //_Game.reiniciarMovimiento();
    if (teclado.keyCode == FLECHA_DERECHA) {
        _Game.moverDerecha = true;        
        _Game.pacman.d = 'derecha';
    }
    else if (teclado.keyCode == FLECHA_IZQUIERDA) {
        _Game.moverIzquierda = true;
        _Game.pacman.d = 'izquierda';
    }
    else if (teclado.keyCode == FLECHA_ARRIBA) {
        _Game.moverArriba = true;
        _Game.pacman.d = 'arriba';
    }
    else if (teclado.keyCode == FLECHA_ABAJO) {
        _Game.moverAbajo = true;
        _Game.pacman.d = 'abajo';
    }

    //_Game.startApp();
}


//Clase game y propiedades basicas
function Game() {
    this.galletas = 0;
    this.moverDerecha = false;
    this.moverIzquierda = false;
    this.moverArriba = false;
    this.moverAbajo = false;

    //Numero de frames por segundo
    this.maxfps = 32;

    //Millisegundos q    debe durar cada frame
    this.drawInterval = 1 / this.maxfps * 2000;

    //Propiedad para la referencia del elemento canvas de la pagina
    this.canvas = null;

    //Propiedad para guardar el contexto del elemento canvas (2D O 3D)
    this.canvasCtx = null;

    this.initGame = function () {
        //se guarda el objeto en la variable global _Game
        _Game = this;

        //Referencia al elemento canvas de la pagina
        this.canvas = document.getElementById('canvas');

        //Se guarda el contexto sobre el cual se va  atrabajar 2d
        this.canvasCtx = this.canvas.getContext('2d');

        //Posicion de pacman
        this.pacman = {
            //Posicion en el eje x
            x: 0,
            //posicion en el eje y
            y: 0,
            //alto del pacman en px
            h: 20,
            //ancho del pacman en px
            w: 20,
            //incremento de pixeles a cada frame
            s: 5,
            //Direcccion
            d:'derecha'
        }


        this.galleta = {
            //Posicion en el eje x
            x: 50,
            //posicion en el eje y
            y: 40,
            //radio
            r: 5,
            //visibilidad
            visible: true

        }

        //Intervalo q llama cada X millisegundos el metodo startApp
        setInterval(function () { _Game.startApp(); }, this.drawInterval);
        //_Game.startApp();

    }

    this.indexImage = '1';
    

    this.startApp = function () {
        this.update();
        this.drawPacman();
        this.drawGalleta();
    }

    //Incrementa la posicion X del pacman a cada frame comprobando q no se salga del espacio de dibujo
    this.update = function () {
        //Valida el limite hacia la derecha
        if (this.pacman.x + this.pacman.w > this.canvas.width)
            this.pacman.x -= this.pacman.s;

        //Valida el limite hacia la izquierda
        if (this.pacman.x < 0)
            this.pacman.x += this.pacman.s;

        //Valida el limita hacia arriba
        if (this.pacman.y < 0)
            this.pacman.y += this.pacman.s;

        //Valida el limite hacia Abajo
        if (this.pacman.y + this.pacman.w > this.canvas.height)
            this.pacman.y -= this.pacman.s;

        if (this.moverDerecha) {
            this.pacman.x += this.pacman.s;
            this.indexImage = this.indexImage == '1' ? '2' : '1';
        }

        else if (this.moverIzquierda) {
            this.indexImage = this.indexImage == '1' ? '2' : '1';
            this.pacman.x -= this.pacman.s;
        }

        else if (this.moverArriba) {
            this.indexImage = this.indexImage == '1' ? '2' : '1';
            this.pacman.y -= this.pacman.s;
        }

        else if (this.moverAbajo) {
            this.indexImage = this.indexImage == '1' ? '2' : '1';
            this.pacman.y += this.pacman.s;
        }
        

        //validar el contacto
        var caly = this.pacman.y + 20;
        var calx = this.pacman.x + 20;

        if (this.pacman.x <= this.galleta.x && calx >= this.galleta.x && this.pacman.y <= this.galleta.y && caly >= this.galleta.y) {
            this.galletas += 1;
            $('#galletas').html(this.galletas);
            this.galleta.x = Math.floor(Math.random() * this.canvas.width);
            this.galleta.y = Math.floor(Math.random() * this.canvas.height);
        }

        this.drawPacman();
    }

    this.drawPacman = function (coordX, coordY) {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);        
        this.canvasCtx.drawImage($('#' + this.pacman.d + this.indexImage)[0], this.pacman.x, this.pacman.y, this.pacman.w, this.pacman.h);
        
        //this.canvasCtx.drawImage($("#imageSprite")[0] ,this.pacman.x,this.pacman.y,this.pacman.w,this.pacman.h,this.pacman.x,this.pacman.y,this.pacman.x + 20,this.pacman.y + 20);
    }

//    this.draw = function () {
//        //Limpia el area de dibujo  del canvas
//        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//        this.canvasCtx.beginPath();
//        this.canvasCtx.rect(this.pacman.x, this.pacman.y, this.pacman.w, this.pacman.h);
//        this.canvasCtx.fillStyle = "#000";
//        this.canvasCtx.closePath();
//        this.canvasCtx.fill();
//    }

    this.drawGalleta = function() {
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(this.galleta.x, this.galleta.y, this.galleta.r, 0, Math.PI * 2, true);
        this.canvasCtx.closePath();
        this.canvasCtx.fill();
    }

    this.reiniciarMovimiento = function () {
        this.moverDerecha = false;
        this.moverIzquierda = false;
        this.moverArriba = false;
        this.moverAbajo = false;
    }
}