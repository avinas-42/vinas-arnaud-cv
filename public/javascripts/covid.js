import { Person } from './modules/Person.js';
import { graph, initgraph } from './modules/graph.js';

var nbsafeinit = 3000;
var nbsickinit = 100;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var safe = [];
var sick = [];
var imun = [];
var autoimun = true;
var nbdaymin = 8000;
var nbdayvar = 7000;
var timeout = 0;

function contaminehim(sick, safe, persone) {    
    persone.color = 'red';
    sick.push(persone);
    
    timeout = setTimeout(function(){
        persone.color = 'blue';
        if(autoimun)
        {
            imun.push(persone);
            persone.imuniser = true;
        }
        else
        {
            safe.push(persone)
        }
        var index = -1;
        for(var i = 0; i < sick.length; i++) {
            if(sick[i].id === persone.id) {
                index = i;
                break;
            }
        }
        sick.splice(index ,1);
    }, nbdaymin + Math.floor((Math.random() * nbdayvar) - 1));
    
    safe.splice(safe.indexOf(persone) ,1);
}

function contamine(sick, safe) {
    sick.forEach(function(sickPerson){ 
        safe.forEach(function(safePerson){
            if ((safePerson.x < sickPerson.x + 3 &&
                safePerson.x + 3 > sickPerson.x &&
                safePerson.y < sickPerson.y + 3 &&
                3 + safePerson.y > sickPerson.y) &&
                !safePerson.imuniser) {
                contaminehim(sick, safe, safePerson);
            }
        });
    });
}

function draw() {
    var imageData = ctx.createImageData(canvas.width, canvas.height);
    var display = document.getElementById("display").checked;
    autoimun = document.getElementById("imunisation").checked;
    nbdaymin = document.getElementById("nbdaymin").value * 1000;
    nbdayvar = document.getElementById("nbdayvar").value * 1000;
    safe.forEach(function(person){
        if(display)
            imageData = person.draw(imageData, false, person.imuniser);
        person.move();
    });
    sick.forEach(function(person){
        if(display)
            imageData = person.draw(imageData, true, person.imuniser);
        person.move();
    });
    imun.forEach(function(person){
        if(display)
            imageData = person.draw(imageData, false, person.imuniser);
        person.move();
    });
    
    contamine(sick, safe);

    ctx.putImageData(imageData, 0, 0);
    window.requestAnimationFrame(draw);
}

function init() {
    while (timeout--) {
        window.clearTimeout(timeout);
    }
    nbsafeinit = document.getElementById("nbsafe").value;
    nbsickinit = document.getElementById("nbsick").value;
    safe = [];
    sick = [];
    imun = [];

    var i;
    for (i = 0; i < nbsafeinit; i++) {
        safe.push(new Person('blue'));
    }
    for (i = 0; i < nbsickinit; i++) {
        contaminehim(sick, safe, safe[i])
    }
    window.requestAnimationFrame(draw);
    initgraph(safe.length, sick.length);
    window.setInterval(timer, 100);
}

function timer() {
    graph(safe.length, sick.length);
}

document.getElementById("lancer").addEventListener("click", init);
