let se = new Audio("sounds/ButtonClick.wav");
let adr = "sounds/BG/",
	playlist = ["bakura","banditkeith","critiasJ","exodia","joey","kaiba","millenniumbattle","obelisk","orichalcos","passionateduelistextended","ra","slifer","timaeus","yugi","zorc"],
	ras = ".mp3",
	played = new Audio(),
	current_song = -1;

// LOAD SETTINGS

const stored_music_volume = window.localStorage.getItem("Music_Volume");
if(isNaN(stored_music_volume)) window.localStorage.setItem("Music_Volume", 0.5);
played.volume = stored_music_volume;

const stored_click_volume = window.localStorage.getItem("Click_Volume");
if(isNaN(stored_click_volume)) window.localStorage.setItem("Click_Volume", 0.1);
se.volume = stored_click_volume;

// END LOAD

if(played.canPlayType('audio/mp3') !== "probably") ras = ".ogg";

async function rand_song(){
	let next_song = Math.floor(Math.random() * 15);
	if(current_song == -1 || current_song != next_song) current_song = next_song;
	else {
		function randomize(){
			return new Promise((resolve, reject) => {
				let interval = setInterval(() => {
					next_song = Math.floor(Math.random() * 15);
					if(next_song != current_song){
						clearInterval(interval);
						resolve(next_song);
					}
				}, 10);
			});
		}
		current_song = await randomize();
	}
	return playlist[current_song];

}
async function BGA(){
	played.src = adr + await rand_song() + ras;
	played.play();
}
played.onended = BGA;

function clickSound(){
	se.play();
}
function delayedHref(url){
	setTimeout(function(){ window.location.href = `${url}.html`; }, 500);
}
function btt(url) {
	clickSound();
	delayedHref(url);
}
let mute;
function MuteButtonWithMusic(muteId) {
	BGA();
	mute = document.getElementById(muteId);
	Unmute(muteId);
}
function Mute(muteId) { 
	played.muted = true;
	document.getElementById("muteImg").src="PNG/speaker muted.png";
	mute.onclick= Unmute;
}
function Unmute(muteId) {
	played.muted = false;
	document.getElementById("muteImg").src="PNG/speaker.png";
	mute.onclick= Mute;
}

for(let i of document.querySelectorAll('.field-group')){
    const input = i.querySelector('input'); 
	const label = i.querySelector('label');
    const input_class = input.classList;
    const label_class = label.classList;
    input.onfocus = () => {
        label_class.add('label-focused');
    };
    input.onblur = () => {
		input.removeAttribute('class');
        if(!input.value) label.removeAttribute('class');
        else
            if(input.validity.valid) input_class.add('valid');
            else input_class.add('invalid');
    };
}
const confirm = document.querySelector('input[id=confirm]');
const password = document.querySelector('input[id=password]');
const form = document.querySelector('form');
if(confirm && password){
	const confirm_func = () => {
		confirm.removeAttribute('class');
		if(confirm.value){
			if(password.value && password.value != confirm.value){
				confirm.classList.add('invalid');
				confirm.setCustomValidity('Does not match password field.')
			}
			else{
				confirm.classList.add('valid');
				confirm.setCustomValidity('');
			}
		}
	}
	form.onchange = confirm_func ;
}