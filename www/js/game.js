var targetRGB, userRGB,
    targetLAB, userLAB,
    deltaE;

var status = "playing",
    visualization = 'stars';

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

function gradeDelta(newDelta){

  var newClass, newMessage;

  if (newDelta < 1) {
    newClass="rating--9";
    newMessage="Excelente";
  } else if (newDelta < 2.2) {
    newClass="rating--8";
    newMessage="Excelente";
  } else if (newDelta < 5) {
    newClass="rating--7";
    newMessage="Muy bueno";
  } else if (newDelta < 8) {
    newClass="rating--6";
    newMessage="Muy bueno";
  } else if (newDelta < 12) {
    newClass="rating--5";
    newMessage="Aceptable";
  } else if (newDelta < 18) {
    newClass="rating--4";
    newMessage="Aceptable";
  } else if (newDelta < 25) {
    newClass="rating--3";
    newMessage="Pobre";
  } else if (newDelta < 35) {
    newClass="rating--2";
    newMessage="Pobre";
  } else if (newDelta < 50) {
    newClass="rating--1";
    newMessage="Malo";
  } else {
    newClass="rating--0";
    newMessage="Malo";
  }

  return [newClass, newMessage];

}

function setupResultFor(newDelta){

  var resultContainer = document.getElementById('resultP');
  var resultText = document.getElementById('resultText');
  var messages = gradeDelta(newDelta);

  console.log(newDelta)

  $('body').removeClass('rating--0');
  $('body').removeClass('rating--1');
  $('body').removeClass('rating--2');
  $('body').removeClass('rating--3');
  $('body').removeClass('rating--4');
  $('body').removeClass('rating--5');
  $('body').removeClass('rating--6');
  $('body').removeClass('rating--7');
  $('body').removeClass('rating--8');
  $('body').removeClass('rating--9');

  $('body').addClass(messages[0]);

  resultText.innerHTML = messages[1];
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

$(".result").dblclick(function(){

  if (visualization == 'stars') {
    $('body').removeClass('result--stars');
    $('body').addClass('result--number');
    visualization = 'number';
  } else {
    $('body').removeClass('result--number');
    $('body').addClass('result--stars');
    visualization = 'stars'
  }

});

getNewTargetColor()
