const url = 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-tv';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5639854e5bmsh4f3701e8477f763p1ace08jsnbd916f27eea6',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};


async function ObtenerSeries() {
	try {
		const response = await fetch(url, options);
		const series = await response.json();

		series.forEach(serie => {
			makeCard(serie);
		});
	} catch (error) {
		console.error(error);
	}
}

ObtenerSeries();

function makeCard(serie) {
	const { primaryTitle, primaryImage, startYear, trailer, averageRating } = serie;

	const Containercard = document.querySelector('.series-container');

	const Card = document.createElement('div');
	Card.classList.add('serie-card');

	// Capa de overlay para el hover
	const Overlay = document.createElement('div');
	Overlay.classList.add('overlay');
	Overlay.innerHTML = `<i class="fa-regular fa-circle-play"></i> Ver trailer`;


	const Image = document.createElement('img');
	Image.src = primaryImage;

	const Info = document.createElement('div');
	Info.classList.add('serie-info');

	const Title = document.createElement('h5');
	Title.textContent = primaryTitle;

	const Rating = document.createElement('h2');
	Rating.innerHTML = `<i class="fa-solid fa-star" style="color:gold;"></i> ${averageRating ?? 'Desconocida'}`;

	const Year = document.createElement('p');
	Year.textContent = `${startYear ?? 'Desconocido'}`;

	
	Info.appendChild(Rating);
	Info.appendChild(Title);
	Info.appendChild(Year);


	Card.appendChild(Image);
	Card.appendChild(Overlay); // Overlay por encima
	Card.appendChild(Info);

	Containercard.appendChild(Card);

	// Evento click para mostrar el trailer
	Card.addEventListener('click', () => {
		const modal = document.getElementById('trailerModal');
		const frame = document.getElementById('trailerFrame');

		if (trailer) {
			const youtubeUrl = trailer.replace('watch?v=', 'embed/');
			frame.src = youtubeUrl;
			modal.style.display = 'flex';
		} else {
			alert('No hay trailer disponible para esta serie.');
		}
	});
}

// Cerrar al hacer clic en la X
document.querySelector('.close-btn').addEventListener('click', () => {
	const modal = document.getElementById('trailerModal');
	const frame = document.getElementById('trailerFrame');
	modal.style.display = 'none';
	frame.src = ''; // Limpia el iframe
});
