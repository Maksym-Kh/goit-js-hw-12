import { getImagesByQuery } from "./js/pixabay-api"

import { createGallery, clearGallery, showLoader, hideLoader} from "./js/render-functions"





import errorSvg from "./img/error.svg"
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const refs = {
    searchBtn: document.querySelector('[type="submit"]'),
    searchInput: document.querySelector('[name="search-text"]'),
    form: document.querySelector('.form'),
    galleryList: document.querySelector('.gallery'),
    
}


const onFormInter = evt => {
    evt.preventDefault();
    const query = evt.currentTarget.elements['search-text'].value.trim();
    

    clearGallery();   

    if (query === '') {
        iziToast.error({
            message: "Будь ласка, введіть пошуковий запит!",
            messageColor: "#ffffff",
            backgroundColor: "#EF4040",
            timeout: 5000,
            titleColor: "#fff",
            iconUrl: errorSvg,
            position: "topRight",
        });
        return;
}

    showLoader();
    getImagesByQuery(query).then(response => {
        const imageArr = response.hits;

        if (imageArr.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                messageColor: "#ffffff",
                backgroundColor: "#EF4040",
                timeout: 5000,
                titleColor: "#fff",
                iconUrl: errorSvg,
                position: "topRight",
            });
            return;
        };

        hideLoader();
        createGallery(imageArr);
        
        
    }).catch(err => {
        hideLoader();
        console.error(err);
    }).finally(() => {
        hideLoader();
        refs.form.reset();
    });
 
}

refs.form.addEventListener('submit', onFormInter);
