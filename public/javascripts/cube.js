var cube = document.querySelector('.cube');
var currentClass = '';
var oldElem = null;
const doNotClick = 'do-not-click';

function sleep(duration) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, duration * 1000)
	})
}
function rotate(elem) {
    var classToShow = 'show-' + elem.id;
    if ( oldElem )
    {
        oldElem.classList.remove(doNotClick);
    }
    elem.classList.add(doNotClick);
    if ( currentClass ) {
        cube.classList.remove( currentClass );
    }
    cube.classList.add( classToShow );

    currentClass = classToShow;
    oldElem = elem;
}

async function init() {    
    rotate(document.getElementById("front"));
    await sleep(0.7);
    rotate(document.getElementById("back"));
    await sleep(0.5);    
    rotate(document.getElementById("bottom"));
    await sleep(0.7);
    rotate(document.getElementById("top"));
    await sleep(0.5);
    // rotate(document.getElementById("left"));
    // await sleep(0.5);
    rotate(document.getElementById("front"));

}
init();