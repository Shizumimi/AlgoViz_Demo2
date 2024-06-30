var av = new JSAV("container");

var paused = false;
var autoBottonAlowed = true;
var array = [5,7,6,8,3,1];
var arr = av.ds.array(array);
displayArray();
av.recorded();   
function getArray() {
    paused = true;
    let code = document.getElementById('codeInput').value;
    let arrayMatch = code.match(/int arr\[\] = {([^}]+)}/);
    if (arrayMatch) {
        var values = arrayMatch[1].split(',').map(Number);
    }
    av.clear();
    arr.clear();
    av = new JSAV("container");
    arr = av.ds.array(values);
    displayArray();
    av.recorded();
}
function displayArray(){
    
    av.umsg("THis is Bubble Sort");
    av.displayInit();
    
    for (var i = 0; i < arr.size() - 1; i++) {
        for (var j = 0; j < arr.size() - i - 1; j++) {
            av.umsg("Round" + (i+1) + ".");
            arr.highlight(j);
            arr.highlight(j + 1);
            av.step();
            if (arr.value(j) > arr.value(j + 1)) {
                av.effects.swapValues(arr , j , arr , j + 1);
                av.umsg("Round" + (i+1) + "." + "\n" + "Change element " + arr.value(j + 1) + " and " + arr.value(j) + ".");
            }
            arr.unhighlight(j);
            arr.unhighlight(j + 1);
            av.step();
        }
    }
    av.umsg("Bubble Sort done!");   
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/* let totalSteps = av.animInfo().steps;
async function autoPlay(){
    let steps = 0;
    while(steps <= totalSteps){
    await delay(1000);
    av.jumpToStep(steps);
    steps++;
    }
    steps = 0;
} */
/* async   function setAuto(){
    if(autoBottonAlowed){
        autoBottonAlowed = false;
        while(av.forward()){
            await delay(1000);
        }
    }
} */
async function autoPlay(){
    while(av.currentStep() < av.animInfo().steps){
        if(paused){
            break;
        }else{
            av.forward();
            await delay(500);
        }
        
    }
    autoBottonAlowed = true;
}   
function setAuto(){
    /* av.jumpToStep(0); */
    paused = false;
    if(autoBottonAlowed){
        autoBottonAlowed = false;
        autoPlay();
    }
}
function setPause(){
    paused = true;
}
