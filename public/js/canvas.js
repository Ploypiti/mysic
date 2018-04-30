//expand toolbar
function expand(e) {
var allExpanded = document.querySelectorAll( "div[id^='expanded_']" );
Array.from( allExpanded ).forEach( s => (s.style.display = "none") );
document.getElementById("expanded_" + e).style.display = "block";
document.getElementById("toolbar_expand").style.display = "block";
}

//sliders
//volume
var volume = document.getElementById("volume_s");
var v_output = document.getElementById("volume_value");
v_output.innerHTML = volume.value/100 + "px";
volume.oninput = function() {
  v_output.innerHTML = this.value/100 + "px";
}
//trim
var trimtime = document.getElementById("trim_s");
var t_output = document.getElementById("trim_value");
t_output.innerHTML = trimtime.value + "s";
trimtime.oninput = function() {
  t_output.innerHTML = this.value + "s";
}
