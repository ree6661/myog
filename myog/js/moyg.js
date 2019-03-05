let se = new Audio("sounds/ButtonClick.wav");
let adr = "sounds/BG/",
	playlist = ["bakura","banditkeith","critiasJ","exodia","joey","kaiba","millenniumbattle","obelisk","orichalcos","passionateduelistextended","ra","slifer","timaeus","yugi","zorc"],
	ras = ".mp3",
	played = new Audio(),
	current_song = -1;
played.volume = 0.5;
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
	se.volume = 0.1;
	se.play();
}
function delayedHref(url){
	setTimeout(function(){ window.location.href = `${url}.html`; }, 500);
}
function btt(url) {
	clickSound();
	delayedHref(url);
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