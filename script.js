//code qui permet de déplacer les cercles de couleur en arrière plan
let isDragging = false;
let currentCircle = null;

document.querySelectorAll('.blur-circle').forEach(circle => {
	circle.addEventListener('mousedown', function (e) {
		// Arrêter le déplacement de l'ancien cercle
		if (currentCircle) {
			currentCircle.onmouseup();
		}

		isDragging = true;
		currentCircle = e.target;
		let shiftX = e.clientX - currentCircle.getBoundingClientRect().left;
		let shiftY = e.clientY - currentCircle.getBoundingClientRect().top;

		function moveAt(pageX, pageY) {
			currentCircle.style.left = pageX - shiftX + 'px';
			currentCircle.style.top = pageY - shiftY + 'px';
		}

		function onMouseMove(event) {
			if (isDragging) {
				moveAt(event.pageX, event.pageY);
			}
		}

		document.addEventListener('mousemove', onMouseMove);

		currentCircle.onmouseup = function () {
			isDragging = false;
			document.removeEventListener('mousemove', onMouseMove);
			currentCircle.onmouseup = null;
			currentCircle = null;
		};
	});

	circle.ondragstart = function () {
		return false;
	};
});

document.addEventListener('mouseup', () => {
	isDragging = false;
	currentCircle = null;
});

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		isDragging = false;
		currentCircle = null;
	}
});