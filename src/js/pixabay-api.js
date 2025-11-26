import axios from "axios";


const myApiKey = "53375208-e57c58d3edc6a90b7b7ee591a";


// let page = 1;
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
const params = new URLSearchParams({
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
});



    const response = await axios.get(`https://pixabay.com/api/?key=${myApiKey}&${params}`);
    return response.data;
};