var root = document.documentElement;
var cube = document.querySelector('.cube');
var currentClass = '';
var oldElem = null;
const doNotClick = 'do-not-click';
const butSelect = 'but-select-anyway'
const sourceToAdd = '<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;"> <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden" frameborder="0" type="text/html" src="https://www.dailymotion.com/embed/video/x770zyb?autoplay=0" width="100%" height="100%" allowfullscreen> </iframe> </div>'
changeSense();
function changeSense()
{
    if (root.clientWidth < root.clientHeight)
    {
        root.style.setProperty('--size-to-use', "100vw");
        console.log("vertical " + root.clientWidth +" | "+root.clientHeight);
    }
    else
    {
        root.style.setProperty('--size-to-use', "100vh");
        console.log("horizontal " + root.clientWidth +" | "+root.clientHeight);
    }
}
window.addEventListener('resize', changeSense);

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
        oldElem.classList.add(butSelect)
        oldElem.classList.remove(doNotClick);
    }
    elem.classList.add(doNotClick);
    elem.classList.remove(butSelect);
    if ( currentClass ) {
        cube.classList.remove( currentClass );
    }
    cube.classList.add( classToShow );

    currentClass = classToShow;
    oldElem = elem;
}

function displayVideo() {
    var toReplace = document.getElementById("rapport-de-stage");
    var videoElement = document.createElement('div');
    videoElement.innerHTML = sourceToAdd.trim();
    toReplace.replaceWith(videoElement);
}

async function init() {
    rotate(document.getElementById("back"));
    await sleep(0.7);     
    rotate(document.getElementById("bottom"));
    await sleep(0.7);
    rotate(document.getElementById("front"));
    await sleep(0.5);
    displayVideo();

}
init();