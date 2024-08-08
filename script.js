document.addEventListener('DOMContentLoaded', () => {
    // se obtienen la referencias a los elementos del DOM
    const addImageButton = document.getElementById('addImage');
    const galleryContainer = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    const closeModal = document.getElementById('closeModal');
    const editImageUrl = document.getElementById('editImageUrl');
    const editImageTitle = document.getElementById('editImageTitle');
    const saveChanges = document.getElementById('saveChanges');
    const deleteImage = document.getElementById('deleteImage');
    let currentImageItem = null;

    // Es un evento para añadir una nueva imagen a la galeria
    addImageButton.addEventListener('click', () => {
        // captura los el url y el nombre de la imagen
        const imageUrl = document.getElementById('imageUrl').value;
        const imageTitle = document.getElementById('imageTitle').value;

        // una pequeña verificacion para que compruebe que ambos campos no esten vacios
        if (imageUrl && imageTitle) {
            // crea un nuevo contenedor para la imagen
            const imageItem = document.createElement('div');
            imageItem.classList.add('image-item');

            // configura un elemento de la imagen
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = imageTitle;

            // configura el titulo de la imagen
            const title = document.createElement('h3');
            title.textContent = imageTitle;

            // configura el boton de eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                // un efecto de desvanecimiento al eliminar 
                imageItem.style.opacity = 0;
                setTimeout(() => {
                    imageItem.remove();
                }, 300);
            });

            // configura el boton de detalles
            const detailsBtn = document.createElement('button');
            detailsBtn.textContent = 'Detalles';
            detailsBtn.classList.add('details-btn');
            detailsBtn.addEventListener('click', () => {
                // muestra los detalles de la imagen
                modal.style.display = 'flex';
                modalImage.src = imageUrl;
                caption.textContent = imageTitle;
                editImageUrl.value = imageUrl;
                editImageTitle.value = imageTitle;
                currentImageItem = imageItem; // guarda para despues editar y eliminar
            });

            // añade elementos al contenedor de la imagen
            imageItem.appendChild(img);
            imageItem.appendChild(title);
            imageItem.appendChild(deleteBtn);
            imageItem.appendChild(detailsBtn);
            
            // añade un contenedor con la imagen a la galeria
            galleryContainer.appendChild(imageItem);
        }
    });

    // cierra 
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // cierra si se hace click fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // guarda los cambios de los detalles de la imagen
    saveChanges.addEventListener('click', () => {
        if (currentImageItem) {
            // obtiene el nuevo url o el nuevo nombre
            const newImageUrl = editImageUrl.value;
            const newImageTitle = editImageTitle.value;

            // actualiza la imagen 
            const img = currentImageItem.querySelector('img');
            const title = currentImageItem.querySelector('h3');

            if (newImageUrl) img.src = newImageUrl;
            if (newImageTitle) title.textContent = newImageTitle;

            // oculta despues de guardar los cambios
            modal.style.display = 'none';
        }
    });

    // elimina imagen 
    deleteImage.addEventListener('click', () => {
        if (currentImageItem) {
            // añade un efecto de desvanecimiento al eliminar
            currentImageItem.style.opacity = 0;
            setTimeout(() => {
                currentImageItem.remove();
                modal.style.display = 'none'; // oculta despues de eliminar
            }, 300);
        }
    });
});
