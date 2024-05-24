// list of songs 
let ary = ['Arash feat Helena  One Night In Dubai Official Video.mp3', 'Let Me Down Slowly  Tommy and Grace  Peaky Blinders.mp3', 'Maine Royaan  Official Music Video  Tanveer Evan.mp3','Arash feat Helena  One Night In Dubai Official Video.mp3', 'Let Me Down Slowly  Tommy and Grace  Peaky Blinders.mp3', 'Maine Royaan  Official Music Video  Tanveer Evan.mp3','Arash feat Helena  One Night In Dubai Official Video.mp3', 'Let Me Down Slowly  Tommy and Grace  Peaky Blinders.mp3', 'y2mate.com - Maine Royaan  Official Music Video  Tanveer Evan.mp3'];
let crtAuido=new Audio();
let play=document.querySelector("#play");

//play Music 
function playMusic(track, pause=false){
	//let auido= new Audio(track);
	crtAuido.src=track;
	if(!pause){
		crtAuido.play();
		play.src="img/paused.svg";
	}
	document.querySelector(".songinfo").innerHTML=track.replaceAll("%20", " ");
	document.querySelector(".songtime").innerHTML="00:00 / 00:00";
}
playMusic("Arash feat Helena  One Night In Dubai Official Video.mp3",true);


let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
for (const song of ary) {
	songUl.innerHTML = songUl.innerHTML + `<li>
												<img class="invert" src="img/music.svg" alt="musicLogo">
												<div class="info">
													<div>${song.replaceAll("%20", " ")}</div>
													<div>Sajid Ali</div>
												</div>
												<div class="playNow">
													<span>Play Now</span>
													<img class="invert" src="img/play.svg" alt="playLogo">
												</div>
											</li>`;
}

// Attach an event listener to each song
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
	e.addEventListener("click", element=>{
		console.log(e.querySelector(".info").firstElementChild.innerHTML);
		playMusic(e.querySelector(".info").firstElementChild.innerHTML.replaceAll(" ", "%20"));
	})
})

// Attach an event listener to play, next ,previous
play.addEventListener("click",()=>{
	if(crtAuido.paused){
		console.log("song is play state");
		crtAuido.play();
		play.src="img/paused.svg";
		
	}
	else{
		console.log("song is paused state");
		crtAuido.pause();
		play.src="img/play.svg";
	}
})

// Convert second to mintues 

function secondsToMinutesSeconds (seconds) {
	if (isNaN(seconds) || seconds < 0) {
	return "00:00";
	}
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	const formattedMinutes = String (minutes).padStart (2, '0');
	const formattedSeconds = String (remainingSeconds).padStart(2, '0');
	return `${formattedMinutes}:${formattedSeconds}`;
}

// song current time and duration update
crtAuido.addEventListener("timeupdate", ()=>{
	document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(crtAuido.currentTime)} / ${secondsToMinutesSeconds(crtAuido.duration)}`;
	document.querySelector(".circle").style.left=(crtAuido.currentTime/crtAuido.duration)*100 + "%";
})

// add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click", e=>{
	let percent= (e.offsetX/e.target.getBoundingClientRect().width)* 100;
	document.querySelector(".circle").style.left=percent + "%";
	crtAuido.currentTime=((crtAuido.duration)*percent)/100;
})

// add event listener for hambuger

document.querySelector(".hamburger").addEventListener("click",()=>{
	document.querySelector(".left").style.left="0";
})

// add event listener for close 

document.querySelector(".close").addEventListener("click",()=>{
	document.querySelector(".left").style.left="-120%";
})

// add event listener for previous and next 
document.querySelector("#previous").addEventListener("click",()=>{
	let previousURL=crtAuido.src.replace("file:///D:/Delta%20course/Spotify%20Clone/","")
	previousURL=previousURL.replaceAll("%20", " ");
	let index=ary.indexOf(previousURL);
	if(index>=1){
	playMusic(ary[index-1]);
	}
	else{
		console.log("This is first song");
	}	
})

// add event listener for next 
document.querySelector("#next").addEventListener("click",()=>{
	let previousURL=crtAuido.src.replace("file:///D:/Delta%20course/Spotify%20Clone/","")
	previousURL=previousURL.replaceAll("%20", " ");
	let index=ary.indexOf(previousURL);
	if(index<ary.length){
	playMusic(ary[index+1]);
	}
	else{
		console.log("This is last song");
	}	
})

// add event listener for valum
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
	//parseInt function work string convert into int
	crtAuido.volume=parseInt(e.target.value)/100;
}) 

// add event listener for mute volum

document.querySelector(".volume > img").addEventListener("click",e=>{
	if(e.target.src.includes("img/volume.svg")){
		e.target.src= e.target.src.replace("img/volume.svg","img/mute.svg");
		crtAuido.volume=0;
		document.querySelector(".range").getElementsByTagName("input")[0].value=0;
	}
	else{
		e.target.src=e.target.src.replace("img/mute.svg", "img/volume.svg");
		crtAuido.volume=1;
		document.querySelector(".range").getElementsByTagName("input")[0].value=50;
	}
})