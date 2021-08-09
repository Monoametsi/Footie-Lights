let match_highlight_teams = document.getElementsByClassName('match-highlight-teams');

let highlightVidReveal = function(){
	
	for(i = 0; i < match_highlight_teams.length; i++){
		
		let match = match_highlight_teams[i];

		let arr = [match.nextElementSibling.innerText];
		
		match.onclick = function(){
		    
			let vid = this.nextElementSibling;
			
			vid.style.transition = '0.6s';
			
			if(vid.style.maxHeight){
				
				vid.style.maxHeight = null;
				
				setTimeout(() => {
					vid.innerText = arr[0];
				}, 6000);
				
			}else{
				vid.innerHTML = arr[0].replace(/["]/g, "");
				vid.style.maxHeight = vid.scrollHeight + 'px';
				
			}
			
		}
		
	}
	
}

highlightVidReveal();

