let baseM = document.createElement('audio');
    baseM.setAttribute('src', '/audio/baseBgm.mp3');

	function baseBgm() {
		baseM.load();
		baseM.play();
	}

	function pauseBaseM() {
		baseM.pause();
	}

let doorM = document.createElement('audio');
    doorM.setAttribute('src', '/audio/doorOpen.mp3');

	function doorBgm() {
		doorM.load();
		doorM.play();
	}

	function pauseDoorM() {
		doorM.pause();
	}
let moveM = document.createElement('audio');
    moveM.setAttribute('src', '/audio/moveBgm.mp3');

	function moveBgm() {
		moveM.load();
		moveM.play();
	}

	function pauseMoveM() {
		moveM.pause();
	}

let imgChM = document.createElement('audio');
	imgChM.setAttribute('src', '/audio/changeImage.mp3');

	function changeImageBgm() {
		imgChM.load();
		imgChM.play();
	}

	function pauseimgChM() {
		imgChM.pause();
	}
