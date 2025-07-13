// Espera a que todo cargue y luego quita el menú visible
		window.addEventListener('load', function () {
			// Remueve la clase que muestra el menú (si está presente)
			document.body.classList.remove('is-menu-visible');

			// Asegura que el sidebar esté oculto desde el inicio
			document.querySelector('#sidebar').classList.add('inactive');
		});