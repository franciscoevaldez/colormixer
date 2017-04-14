var targetRGB, userRGB,
    targetLAB, userLAB,
    deltaE;

var status = "playing";

var sliderR = document.getElementById("slider--red"),
    sliderG = document.getElementById("slider--green"),
    sliderB = document.getElementById("slider--blue");

function getNewTargetColor(){
  targetRGB = getRandomColor()
  targetLAB = getLABfromRGBobject(targetRGB);
  $("#workarea").css('background-color', 'rgb(' + targetRGB.red + ',' + targetRGB.green + ',' + targetRGB.blue + ')')
}

function changeToState(newState){

  $('body').removeClass("status--playing")
  $('body').removeClass("status--result")

  if(newState == "playing"){
    $('body').addClass("status--playing")
  }

  if(newState == "result"){
    $('body').addClass("status--result");
    setupResultFor(deltaE);
  }

}

function setupResultFor(newDelta){

  var resultContainer = document.getElementById('resultP');

  resultContainer.innerHTML = newDelta;

}

$("#slider--red").change(function() {
    var newValue = this.value;
    $('.bar--red').css('opacity', newValue/255);
});
$("#slider--green").change(function() {
    var newValue = this.value;
    $('.bar--green').css('opacity', newValue/255);
});
$("#slider--blue").change(function() {
    var newValue = this.value;
    $('.bar--blue').css('opacity', newValue/255);
});

$("#btn__new").click(getNewTargetColor)

$("#btn__compare").click(function(){

  userRGB = {
    red : sliderR.value,
    green : sliderG.value,
    blue : sliderB.value
  };

  userLAB = getLABfromRGBobject(userRGB);
  deltaE = getDeltaEforPair(targetLAB, userLAB);
  changeToState("result");

})

$("#btn__retry").click(function(){
  changeToState("playing");
})

$("#btn__restart").click(function(){
  getNewTargetColor()
  changeToState("playing");
})

getNewTargetColor()
