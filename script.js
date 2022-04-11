table="";
let tbl=document.getElementById("tbl");

let a = [1,2,3,4,5,6,7,8,9,10 ,11,12,13,14,15,16],
ranNums = [],
i = a.length,
rnd = 0;

        while (i--) {
            rnd = Math.floor(Math.random() * (i+1));
            ranNums.push(a[rnd]);
            a.splice(rnd,1);
        } 

let sira=0;

for (let i=1;i<5;i++){
    table+=`<tr>`
    for(let j=1;j<5;j++){
        table+=`<td onclick="clickedtd(this)">${ranNums[sira]}</td>`
        sira++;
    }
    table+=`</tr>`
}
document.getElementById('tbl').innerHTML=table;


let pro=1;
function clickedtd(t){
    let tddata=t.innerHTML;
        
         if(pro==tddata){
            t.style.backgroundColor = "green";
            t.style.color = "#fff";
        }
        // else if(pro==16){
        //     break("");
        // }
           else{
            t.style.backgroundColor = "red";
            t.style.color = "#fff";
           }
           pro++;
        }
           

        var minutesel = 0, secondsel = 30, secondInterval = 5;
var starttime = -1, time = -1, running = false, played = false;

$(".switcher[type=\"minutes\"] .time").text(minutesel);
$(".switcher[type=\"seconds\"] .time").text((secondsel < 10 ? "0" : "") + secondsel);

setInterval(timer, 1000); //it doesn't need to be exact, I like how the game keeps a rhythem rather than changing beat each tap

$(".switcher:not([type=\"none\"]) .up, .switcher:not([type=\"none\"]) .down").click(function(){
  if($(this).attr("class") == "up") {
    if ($(this).parent().attr("type") == "minutes") {
      minutesel++;
      $(this).parent().find(".time").text(minutesel);
    } else {
      secondsel+=secondInterval;
      secondsel = (60 + secondsel) % 60;
      $(this).parent().find(".time").text((secondsel < 10 ? "0" : "") + secondsel);
    }
  } else {
    if ($(this).parent().attr("type") == "minutes") {
      minutesel--;
      minutesel = minutesel < 0 ? 0 : minutesel;
      $(this).parent().find(".time").text(minutesel);
    } else {
      secondsel-=secondInterval;
      secondsel = (60 + secondsel) % 60;
      $(this).parent().find(".time").text((secondsel < 10 ? "0" : "") + secondsel);
    }
  }
  if (minutesel + secondsel == 0) {
    $(".begin").hide();
  } else {
    $(".begin").show();
  }
  starttime = minutesel*60 + secondsel;
  time = starttime + 1;
});

$(".begin").click(function(){
  if(!running) {
    $(this).text("Stop");
    starttime = minutesel*60 + secondsel;
    time = starttime + 1;
    running = true;
    $(".switcher").addClass("active");
  } else {
    $(this).text("Begin");
    running = false;
    $(".switcher[type=\"minutes\"] .time").text(minutesel);
    $(".switcher[type=\"seconds\"] .time").text((secondsel < 10 ? "0" : "") + secondsel);
    $(".show").css("height", "100%");
    $(".show").removeClass("timeup");
    $(".switcher").removeClass("active");
  }
});

$("*:not(.begin)").click(function(){
  time = starttime + 1;
});

function timer() {
  console.log(time);
  if(running) {
    time -= 1;
    time = time < 0 ? 0 : time;
    $(".show").css("height", ((time * 100)/starttime) + "%");
    $(".switcher[type=\"minutes\"] .time").text(Math.floor(time/60));
    $(".switcher[type=\"seconds\"] .time").text((time%60 < 10 ? "0" : "") + time%60);
    if(time == 0) {
      if (played) {
        $(".show").addClass("timeup");
        $(".show").css("height", "100%");
      }
      if (!played) {
        played = true;
        $.playSound('http://freesound.org/data/previews/135/135125_2337290-lq.mp3');
      }
    } else {
      played = false;
      $(".show").removeClass("timeup");
    }
  }
}

(function($){

  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;"><source src="' + arguments[0] + '" /><embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false" class="playSound" /></audio>'
      ).appendTo('body');
    }
  });

})(jQuery);