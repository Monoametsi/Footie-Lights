let match_highlight_teams = document.getElementsByClassName('match-highlight-teams');

let match_highlight_box_cont = document.getElementsByClassName('match-highlight-box-cont');

let highlightVidReveal = function(){
	
	for(i = 0; i < match_highlight_teams.length; i++){
		
		let match = match_highlight_teams[i];
		
		let arr = [match.nextElementSibling.innerText];
		
		match.onclick = function(){
		    
			let vid = this.nextElementSibling;
			
			vid.style.transition = '0.6s';
			
			if(vid.style.maxHeight){
				
				vid.style.maxHeight = null;
				
			}else{
				vid.innerHTML = arr[0].replace(/["]/g, "");
				vid.style.maxHeight = vid.scrollHeight + 'px';
				
			}
			
		}
		
	}
	
}

highlightVidReveal();

let searchInput = document.getElementById("search-input");
let notFoundBox = document.getElementById("notFound-cont");

let searchEngineSystem = () => {
	
	let searchInputVal = searchInput.value.toLowerCase().trim();
	let counter = 0;
	
	for(j = 0; j < match_highlight_teams.length; j++){
		
		let teamParentCont = match_highlight_teams[j].parentElement;
		
		let team = match_highlight_teams[j].children[0].innerText.toLowerCase();
		
		if(searchInputVal.length > 2){
			
			if(team.search(searchInputVal) === -1){
				teamParentCont.style.display = "none";
				counter++;
			}else{
				teamParentCont.style.display = "flex";
			}
			
		}else{
			teamParentCont.style.display = "flex";
		}
		
		if(counter === match_highlight_teams.length){
			notFoundBox.style.display = 'flex';
		}else{
			notFoundBox.style.display = 'none';
		}
	}
	
	for(i = 0; i < match_highlight_box_cont.length; i++){
		let count = 0;
		let teamParentCont = match_highlight_box_cont[i].children;
		
		for(j = 0; j < teamParentCont.length; j++){
			
			
			if(searchInputVal.length > 2){
			
				if(window.getComputedStyle(teamParentCont[j], null).display === "none"){
					count++;
				}
				
			}
			
		}
		
		if(searchInputVal.length > 2){
			
			if((teamParentCont.length - 1) === count){
				match_highlight_box_cont[i].style.display = "none";
			}else{
				match_highlight_box_cont[i].style.display = "flex";
			}
			
		}else{
			match_highlight_box_cont[i].style.display = "flex";
		}
		
		count = 0;
	}
}

if(searchInput !== null){
	searchInput.oninput = () => {
		searchEngineSystem();
		redirect();
	}
}

function redirect(){
	
	notFoundBox.children[0].children[0].onclick = () => {
		searchInput.value = "";
		searchInput.value.trim();
		searchEngineSystem();
	}
	
}

//scrollTop
let sections = document.getElementById('Highlights-info-cont');

let scrollTop = document.getElementById('scrollTop-cont');

scrollTop.onclick = function(){
	let count = 0;
	let smoothScrollTop = setInterval(() => {

		if(document.documentElement.scrollTop !== 0 || document.body.scrollTop !== 0){

			scrollBy(0, count--);

		}else{
			clearInterval(smoothScrollTop);
		}

	}, 20);
}

let firstSectionOffsetTop = sections.offsetTop;

let showOrHideBtn = () => {

	if(window.scrollY >= firstSectionOffsetTop * 4 || window.scrollY >= firstSectionOffsetTop * 4){
		
		scrollTop.style.transform = 'translateX(0)';

	}else{
		scrollTop.style.transform = 'translateX(3rem)';
	}
}

showOrHideBtn();

window.onscroll = () => {

	showOrHideBtn();
}

let elemHider = (elem, time, anime) => {
	elem.classList.add(anime);

	setTimeout(() => {
		document.body.style.overflow = "auto";
		document.documentElement.style.overflow = "auto";
		elem.style.display = 'none';

	}, time);

}

let preloader = document.getElementById('load-cont');

window.onload = () => {
	
	elemHider(preloader, 1500, 'hide');

}

let menuToggle = document.getElementById('menu-toggle-cont');
let navList = document.getElementById('football-league-nav-cont');

menuToggle.onclick = function(){
	
	this.classList.toggle('flip-toggle');
	navList.style.transition = '0.3s';
	
	if(navList.style.maxHeight){
		navList.style.maxHeight = null;
	
	}else{
		navList.style.maxHeight = navList.scrollHeight + 'px';
	}
}