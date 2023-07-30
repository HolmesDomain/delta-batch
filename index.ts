import { main } from './prisma/config';
import { callYelp } from './services/yelpService';

// call Yelp API
callYelp("toyota-of-denton-denton-3").then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error("Error occurred:", error);
});