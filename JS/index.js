let match_highlight_teams = document.getElementsByClassName('match-highlight-teams');

let highlightVidReveal = function(){
	
	for(i = 0; i < match_highlight_teams.length; i++){
		
		let match = match_highlight_teams[i];
		
		match.onclick = function(){
		 
			let vid = this.nextElementSibling;

			vid.style.transition = '0.6s';
			
			if(vid.style.maxHeight){
				
				vid.style.maxHeight = null;
				
			}else{
				
				vid.style.maxHeight = vid.scrollHeight + 'px';
				
			}
			
		}
		
	}
	
}

highlightVidReveal();