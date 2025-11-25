import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";




const refs = {
    galleryList: document.querySelector(".gallery"),
    loader: document.querySelector('.loader'),
}

export const createGallery = images => {
    const imageTemplate = images.map(createImagesTemplate).join('');
    refs.galleryList.innerHTML = imageTemplate;
    lightbox.refresh();
} 




export const createImagesTemplate = image => {
    return `<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      alt="${image.tags}"
    />
    <ul class="info-list">
    <li class="info-link"><p class="info-text">Likes</p>${image.likes}</li>
    <li class="info-link"><p class="info-text">Views</p>${image.views}</li>
    <li class="info-link"><p class="info-text">Comments</p>${image.comments}</li>
    <li class="info-link"><p class="info-text">Downloads</p>${image.downloads}</li>
    </ul>
  </a>
</li>`;
};




let lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionsDelay: 250,
        });


export const clearGallery = () => {
 refs.galleryList.innerHTML = '';
};

export const showLoader = () => {
    refs.loader.classList.add('isOpen');
}

export const hideLoader = () => {
    refs.loader.classList.remove('isOpen');
}