/** allgemeine var definition **/
var imgElement = "";
var inputforupload = "";
var readerobj = "";



/** fabric js canvas auf das bereits erstellt canvas mappen **/
var canvasObj = new fabric.Canvas(document.getElementById('stickerCanvas'), {
    backgroundColor: '#c8c8c8'
});

/** Überschreiben der Objektecken mit Icons **/

var HideControls = {
    'tl': true,
    'tr': true,
    'bl': true,
    'br': false,
    'ml': false,
    'mt': false,
    'mr': false,
    'mb': false,
    'mtr': false
};

var ctrlImages = new Array()

function preload() {
    for (i = 0; i < preload.arguments.length; i++) {
        ctrlImages[i] = new Image();
        ctrlImages[i].src = preload.arguments[i];
    }
}

preload(
    "https://cdn.kartendruckerei.de/img/icons/ic_rotate_right_48px.svg",
    "https://cdn.kartendruckerei.de/img/icons/ic_highlight_off_48px.svg",
    "https://cdn.kartendruckerei.de/img/icons/expand-2.svg",

    "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-1/128/save-16.png"
)


//override _drawControl function to change the corner images
fabric.Object.prototype._drawControl = function (control, ctx, methodName, left, top, flipiX, flipiY) {

    var sizeX = this.cornerSize / this.scaleX,
        sizeY = this.cornerSize / this.scaleY;

    if (this.isControlVisible(control)) {
               /* isVML ||*/ this.transparentCorners || ctx.clearRect(left, top, sizeX, sizeY);


        var SelectedIconImage = new Image();
        var lx = '';
        var ly = '';
        var n = '';

        switch (control) {
            case 'tl':
                if (flipiY) { ly = 'b'; } else { ly = 't'; }
                if (flipiX) { lx = 'r'; } else { lx = 'l'; }
                break;
            case 'tr':
                if (flipiY) { ly = 'b'; } else { ly = 't'; }
                if (flipiX) { lx = 'l'; } else { lx = 'r'; }
                break;
            case 'bl':
                if (flipiY) { ly = 't'; } else { ly = 'b'; }
                if (flipiX) { lx = 'r'; } else { lx = 'l'; }
                break;
            case 'br':
                if (flipiY) { ly = 't'; } else { ly = 'b'; }
                if (flipiX) { lx = 'l'; } else { lx = 'r'; }
                break;
            default:
                ly = control.substr(0, 1);
                lx = control.substr(1, 1);
                break;
        }

        control = ly + lx;

        switch (control) {
            case 'tl':
                SelectedIconImage.src = ctrlImages[1].src;
                break;
            case 'tr':
                if (flipiX && !flipiY) { n = '5'; }
                if (!flipiX && flipiY) { n = '3'; }
                if (flipiX && flipiY) { n = '4'; }
                SelectedIconImage.src = ctrlImages[0].src;
                break;
            case 'mt':

                break;
            case 'bl':
                if (flipiY) { n = '2'; }
                SelectedIconImage.src = ctrlImages[3].src;
                break;
            case 'br':
                if (flipiX || flipiY) { n = '2'; }
                if (flipiX && flipiY) { n = ''; }
                SelectedIconImage.src = ctrlImages[2].src;
                break;
            case 'mb':

                break;
            case 'ml':

                break;
            case 'mr':

                break;
            default:
                ctx[methodName](left, top, sizeX, sizeY);
                break;
        }

        if (control == 'tl' || control == 'tr' || control == 'bl' || control == 'br'
            || control == 'mt' || control == 'mb' || control == 'ml' || control == 'mr') {
            sizeX = 30;
            sizeY = 30;
            ctx.drawImage(SelectedIconImage, left, top, sizeX, sizeY);
        }


        try {
            ctx.drawImage(SelectedIconImage, left, top, sizeX, sizeY);

        } catch (e) {
            if (e.name != "NS_ERROR_NOT_AVAILABLE") {
                throw e;
            }
        }


    }
};//end

//********override END*****//





/** eigentliche upload funktion... greift das Element aus dem input Feld ab und wandelt es direkt in base64 um **/

var readFile = function (e) {
    inputforupload = e.target;
    readerobj = new FileReader();

    readerobj.onload = function () {
        var imgElement = document.createElement('img');
        imgElement.src = readerobj.result;

        imgElement.onload = function () {
            /** seltsam aber scheinbar muss alles in die onload Funktion gepackt werden damit die Bildbröße verfügbar ist...
                ausserhalb kommen die Variablen für die Bildgröße nicht an... **/

            console.log(imgElement.width);
            console.log(imgElement.height);

            /** Methode um ein Bild in fabric.js einzufügen **/
            var imageinstance = new fabric.Image(imgElement, {
                angle: 0,
                opacity: 1,
                cornerSize: 30,
            });
            /** Bild skalieren damit es in das Canvas Objekt reinpasst */
            /** check ob canvas portrait oder landscape format ist **/
            var cw = $(".canvas-container").width();
            var ch = $(".canvas-container").height();
            if (cw > ch) {
                /** canvas ist landscape **/
                imageinstance.scaleToWidth($(".canvas-container").width() - 200);
                imageinstance.scaleToHeight($(".canvas-container").height() - 200);

            } else {
                /** canvas ist portrait **/
                imageinstance.scaleToHeight($(".canvas-container").height() - 200);
                imageinstance.scaleToWidth($(".canvas-container").width() - 200);

            }

            imageinstance.setControlsVisibility(HideControls);
            //imageinstance.cornerSize(40);
            //  imageinstance["cornerSize"] = parseFloat(40);
            // removes the right top control
            canvasObj.add(imageinstance);
            canvasObj.centerObject(imageinstance);


        };


    };

    readerobj.readAsDataURL(inputforupload.files[0]);
};

document.getElementById('filereader').addEventListener('change', readFile);



/** Aktionen auf den einzelnen Ecken **/
canvasObj.on('mouse:down', function (e) {
    if (canvasObj.getActiveObject()) {
        var target = this.findTarget();

        if (target.__corner == 'tr') {
            console.log('delete pressed');
            canvasObj.remove(canvasObj.getActiveObject());

        } else if (target.__corner == 'tl') {
            var curAngle = canvasObj.getActiveObject().get('angle');
            canvasObj.getActiveObject().set('angle', curAngle + 15);
            console.log('rotate pressed');
        } else if (target.__corner == 'bl') {
            console.log('scale pressed');
        } else if (target.__corner == 'br') {
            console.log('copy pressed');
        }
    }

});



