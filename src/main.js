import { getImagesByQuery, PER_PAGE } from "./js/pixabay-api"

import { createGallery, appendGallery ,clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, getScrollHeight} from "./js/render-functions"

import errorSvg from "./img/error.svg"
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const refs = {
    searchBtn: document.querySelector('[type="submit"]'),
    searchInput: document.querySelector('[name="search-text"]'),
    form: document.querySelector('.form'),
    moreBtn: document.querySelector('.more-btn'),
}


    hideLoadMoreButton();
    let currentQuery = '';
let currentPage = 1;

let totalHits = 0;
    
  

const onFormInter = async evt => {
    evt.preventDefault();
    const query = evt.currentTarget.elements['search-text'].value.trim();


            currentQuery = query;
        currentPage = 1;
    
    clearGallery();   
// 
hideLoadMoreButton();
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
    totalHits = response.totalHits;



        if (totalHits === 0) {
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

    createGallery(imageArr);

        if (totalHits > PER_PAGE) {
        showLoadMoreButton();
    }
    else{
            hideLoadMoreButton(); 
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "#ffffff",
                backgroundColor: "#FFA000",
                timeout: 5000,
                titleColor: "#fff",
                position: "topRight",
            });
    }


} catch (error) {
        iziToast.error({
            message: "An error occurred while loading more images. Please try again.",
            messageColor: "#ffffff",
            backgroundColor: "#EF4040",
            timeout: 5000,
            titleColor: "#fff",
            iconUrl: errorSvg,
            position: "topRight",
        });
} finally {
        hideLoader();
        refs.form.reset();
    };

}



const onMoreBtnHandle = async evt => {
    currentPage += 1;

    hideLoadMoreButton();
    showLoader();
    
    
    try {
        

    const response = await getImagesByQuery(currentQuery, currentPage);
        const newImage = response.hits;

        appendGallery(newImage);

        const scrollAmount = getScrollHeight();
        if (scrollAmount > 0) {
            scrollBy({
                top: scrollAmount,
                behavior: "smooth",
            })
        }
        
        const loadedImages = currentPage * PER_PAGE;

        if (loadedImages >= totalHits) {
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
        hideLoadMoreButton();
        iziToast.error({
            message: "An error occurred while loading more images. Please try again.",
            messageColor: "#ffffff",
            backgroundColor: "#EF4040",
            timeout: 5000,
            titleColor: "#fff",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }


}


refs.form.addEventListener('submit', onFormInter);
refs.moreBtn.addEventListener('click', onMoreBtnHandle)