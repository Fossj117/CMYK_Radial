// Overall stuff
let myPI = 3.14159265358979323;
let canvasSize = 2000;
let maxLayers = 100; // max number of layers
let maxR = 1000;

let layerMean=5;
let layerSD = 3;
let layerSepMin = 5;

let sliceMean = myPI/32;
let sliceSD = myPI/32;
let sliceSepMin = myPI/128;
let penSize = 3; // in pixels?

// Color stuff - not implemented
const COLOR_MAP = ['cyan', 'magenta', 'yellow', 'black'];
let startColor = [50, 0, 48, 8];
let endColor = [0, 50, 2, 8];

function setup(){

  createCanvas(canvasSize,canvasSize);
  stroke('black');
  noFill();
  noLoop();

}

function draw(){

  translate(canvasSize/2, canvasSize/2);

  let currLayer = 0;
  let currR = 50;

  while(currLayer < maxLayers & currR < maxR){

    let endR = currR + getLayerSize();

    drawLayer(currR, endR); // draws layer and gets its end point

    currLayer+=1;
    currR = endR+layerSepMin;

  }

}

function drawLayer(startR, endR){

  push();
  rotate(random(0,2*PI));

  let currTheta = 0; // start somewhere;

  while(currTheta < 2*PI){

    let nextTheta = currTheta + getSliceSize();

    if(nextTheta > 2*PI-sliceSepMin){
      nextTheta = 2*PI-sliceSepMin;
    }

    drawSlice(startR, endR, currTheta, nextTheta);
    currTheta = nextTheta + sliceSepMin;

  }
  pop();

}

function drawSlice(startR, endR, startTheta, endTheta){

  let sliceWidth = endR-startR;
  let numLines = floor(sliceWidth/penSize);

  let ellipseR = startR;
  for(i=0; i<numLines; i++){
    arc(0,0, ellipseR + (i/numLines)*sliceWidth, ellipseR + (i/numLines)*sliceWidth, startTheta, endTheta, OPEN);
  }

}

function getLayerSize(){
  return(abs(randomGaussian(layerMean, layerSD)));
}

function getSliceSize(){
  return(abs(randomGaussian(sliceMean, sliceSD)));
}

// function arrayLerp(first, second, pct){
//
//   result = [];
//
//   for(k=0; k<first.length; k++){
//     result.push(first[k]*(1-pct) + second[k]*pct);
//   }
//
//   return(result);
// }
