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
			const newX = pageX - shiftX;
			const newY = pageY - shiftY;
			const circleWidth = currentCircle.offsetWidth;
			const circleHeight = currentCircle.offsetHeight;

			if (!isInsideFrame(newX, newY, circleWidth, circleHeight)) {
				currentCircle.style.left = newX + 'px';
				currentCircle.style.top = newY + 'px';
			}
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

// Définir les coordonnées de l'encadrement
const frame = {
	left: window.innerWidth / 4,
	right: (window.innerWidth / 4) * 3,
	top: window.innerHeight / 4,
	bottom: (window.innerHeight / 4) * 3
};

function isInsideFrame(x, y, width, height) {
	return (
		x + width > frame.left &&
		x < frame.right &&
		y + height > frame.top &&
		y < frame.bottom
	);
}
// Initialiser l'état du switch et du thème
window.addEventListener('load', function () {
	const themeSwitch = document.getElementById('theme-switch');
	themeSwitch.checked = false; // Désactiver le switch
	document.body.classList.add('sun-theme'); // Ajouter la classe sun-theme
	document.body.classList.remove('dark-theme'); // Retirer la classe dark-theme

	// Générer des étoiles de manière aléatoire
	const starCount = 50; // Nombre d'étoiles à générer
	const body = document.body;

	for (let i = 0; i < starCount; i++) {
		const star = document.createElement('div');
		star.classList.add('blur-etoile');
		star.style.setProperty('--size', `${Math.random() * 5 + 5}px`); // Taille aléatoire entre 5px et 10px
		star.style.setProperty('--x', `${Math.random() * window.innerWidth}px`); // Position x aléatoire
		star.style.setProperty('--y', `${Math.random() * window.innerHeight}px`); // Position y aléatoire
		body.appendChild(star);
	}

	// Générer des cercles de manière aléatoire avec des couleurs des planètes
	const planetColors = [
		'#ffcc00', // Mercure
		'#ff9900', // Vénus
		'#3399ff', // Terre
		'#ff3300', // Mars
		'#ffcc66', // Jupiter
		'#cc9966', // Saturne
		'#66ccff', // Uranus
		'#3366ff'  // Neptune
	];

	const circleCount = 8; // Nombre de cercles à générer

	for (let i = 0; i < circleCount; i++) {
		const circle = document.createElement('div');
		circle.classList.add('blur-circle');
		circle.style.setProperty('--color', planetColors[i]);
		circle.style.setProperty('--size', `${Math.random() * 100 + 100}px`); // Taille aléatoire entre 100px et 200px

		let x, y;
		do {
			x = Math.random() * window.innerWidth;
			y = Math.random() * window.innerHeight;
		} while (isInsideFrame(x, y, parseFloat(circle.style.getPropertyValue('--size')), parseFloat(circle.style.getPropertyValue('--size'))));

		circle.style.setProperty('--x', `${x}px`); // Position x aléatoire
		circle.style.setProperty('--y', `${y}px`); // Position y aléatoire
		body.appendChild(circle);

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
	}
});

		

// changement de fond grâce au switch 
document.getElementById('theme-switch').addEventListener('change', function () {
	if (this.checked) {
		document.body.classList.add('dark-theme');
		document.body.classList.remove('sun-theme');
	} else {
		document.body.classList.add('sun-theme');
		document.body.classList.remove('dark-theme');
	}
});

const newKonamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A
let konamiIndex = 0;

document.addEventListener('keydown', function (e) {
	if (e.keyCode === newKonamiCode[konamiIndex]) {
		konamiIndex++;
		if (konamiIndex === newKonamiCode.length) {
			triggerEasterEgg();
			konamiIndex = 0;
		}
	} else {
		konamiIndex = 0;
	}
});

function triggerEasterEgg() {
	alert('Easter Egg Activé ! 🌟');
	document.body.style.backgroundColor = '#000'; // Change la couleur de fond en noir

	// Créer un conteneur pour le mini-jeu
	const gameContainer = document.createElement('div');
	gameContainer.classList.add('game-container');
	document.body.appendChild(gameContainer);

	// Ajouter des styles pour le mini-jeu
	const style = document.createElement('style');
	style.innerHTML = `
        .game-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            z-index: 9999;
        }
        .star {
            position: absolute;
            width: 20px;
            height: 20px;
            background-image: url("../image/Star%2014.svg");
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            cursor: pointer;
        }
        .score {
            color: white;
            font-size: 24px;
            margin-bottom: 20px;
        }
    `;
	document.head.appendChild(style);

	// Ajouter un score
	let score = 0;
	const scoreElement = document.createElement('div');
	scoreElement.classList.add('score');
	scoreElement.innerText = `Score: ${score}`;
	gameContainer.appendChild(scoreElement);

	// Fonction pour générer des étoiles de manière aléatoire
	function generateStar() {
		const star = document.createElement('div');
		star.classList.add('star');
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 100}%`;
		gameContainer.appendChild(star);

		// Ajouter un gestionnaire d'événements pour cliquer sur l'étoile
		star.addEventListener('click', () => {
			score++;
			scoreElement.innerText = `Score: ${score}`;
			star.remove();
			generateStar(); // Générer une nouvelle étoile
		});

		// Supprimer l'étoile après un certain temps
		setTimeout(() => {
			if (star.parentElement) {
				star.remove();
				generateStar(); // Générer une nouvelle étoile
			}
		}, 2000); // L'étoile disparaît après 2 secondes
	}

	// Générer la première étoile
	generateStar();

	// Ajouter un gestionnaire d'événements pour la touche Échap
	document.addEventListener('keydown', function onEscapePress(e) {
		if (e.key === 'Escape') {
			// Supprimer le conteneur du mini-jeu
			gameContainer.remove();
			// Réinitialiser le style de fond de la page
			document.body.style.backgroundColor = '';
			// Supprimer le gestionnaire d'événements pour éviter les fuites de mémoire
			document.removeEventListener('keydown', onEscapePress);
		}
	});
}

// Gestion de la visibilité du mot de passe
document.getElementById('toggle-password').addEventListener('click', function () {
	const passwordInput = document.getElementById('password');
	const passwordIcon = this.querySelector('span');

	if (passwordInput.type === 'password') {
		passwordInput.type = 'text';
		passwordIcon.textContent = 'visibility_off';
	} else {
		passwordInput.type = 'password';
		passwordIcon.textContent = 'visibility';
	}
});