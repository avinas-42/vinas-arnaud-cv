var canvas = document.getElementById('graph');
var ctx = canvas.getContext('2d');
var nbsafeinit = 3000;
var nbsickinit = 100;

var nbperson = nbsafeinit + nbsickinit;

var oldx = 0;
var oldsafey = 0;
var oldsicky = canvas.height - 1;

export function initgraph(nbsafe, nbsick) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    nbsafeinit = nbsafe;
    nbsickinit = nbsick;
    nbperson = nbsafeinit + nbsickinit;
    oldx = 0;
    oldsafey = 0;
    oldsicky = canvas.height - 1;
}

export function graph(nbsafe, nbsick) {
    var x = oldx + 1;
    
    // get pourcent

    var safey = (100 * nbsafe) / nbperson;
    var sicky = (100 * nbsick) / nbperson;
    // get pixel position 
    safey = canvas.height * (safey / 100);
    sicky = canvas.height * (sicky / 100);

    safey = canvas.height - safey;
    sicky = canvas.height - sicky; 
    drawline(x, oldx, safey, oldsafey, 'blue');
    drawline(x, oldx, sicky, oldsicky, 'red');

    oldx = x;
    oldsafey = safey;
    oldsicky = sicky;
}
function drawline(x, oldx, y, oldy, color) {
    
    ctx.beginPath();
    ctx.moveTo(oldx, oldy);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.stroke(); 
}

