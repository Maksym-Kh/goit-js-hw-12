import { getImagesByQuery } from "./js/pixabay-api"

import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton} from "./js/render-functions"

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
    moreBtn: document.querySelector('.more-btn'),
}


    hideLoadMoreButton();
    let currentQuery = '';
let currentPage = 1;
        const per_page = 15;
// console.log(currentPage);
    
    // currentPage = 1;
let galleryCardHeight = null;


const onFormInter = async evt => {
    evt.preventDefault();
    const query = evt.currentTarget.elements['search-text'].value.trim();


            currentQuery = query;
        currentPage = 1;
    
    clearGallery();   
// 

// 
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

try {

    const response = await getImagesByQuery(query, currentPage);
    const imageArr = response.hits;
    const totalHits = response.totalHits;



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


    // galleryCardHeight =  refs.galleryList.querySelector('li').getBoundingClientRect().height;
// console.log(galleryCardHeight);
// 
    currentPage += 1;
    //
    const totalPages = Math.ceil(totalHits / per_page);
console.log(totalPages);
        if (currentPage <= totalPages) {
        showLoadMoreButton();
    
    }
// 

} catch (error) {
        hideLoader();
        console.log(error);
} finally {
        hideLoader();
        refs.form.reset();
    };

}



const onMoreBtnHandle = async evt => {
    hideLoadMoreButton();
    showLoader();
    
    
    try {
        

    const response = await getImagesByQuery(currentQuery, currentPage);
        const newImage = response.hits;
        const totalHits = response.totalHits;
        console.log(newImage);
        console.log(totalHits); 
        console.log(per_page);




        if (newImage.length === 0) {
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


        // insertAdjacentHTML("beforeend", newImage);
        
        createGallery(newImage);
        currentPage += 1;

        
 galleryCardHeight =  refs.galleryList.querySelector('li').getBoundingClientRect().height;
console.log(galleryCardHeight);
        scrollBy({
            top: galleryCardHeight * 2,
            behavior: "smooth",
})

        const totalPages = Math.ceil(totalHits / per_page);
        // const loadedImagesCount = (currentPage - 1) * per_page;

        if (currentPage > totalPages) {
            hideLoadMoreButton();
             iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                messageColor: "#ffffff",
                backgroundColor: "#FFA000",
                timeout: 5000,
                titleColor: "#fff",
                position: "topRight",
            });
        } else {
            showLoadMoreButton();
        }

    } catch (error) {
        console.log(error);
    } finally {
        hideLoader();
    }


}


refs.form.addEventListener('submit', onFormInter);
refs.moreBtn.addEventListener('click', onMoreBtnHandle)