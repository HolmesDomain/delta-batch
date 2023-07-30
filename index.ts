import { main } from './prisma/config';
import { callYelp } from './services/yelpService';
import { makeAIRequest } from './services/aiService';

callYelp("toyota-of-denton-denton-3").then((result) => {
    console.log("Yelp result: ", result);
    
    makeAIRequest(result).then((aiResult) => {
        let parsed = JSON.parse(aiResult);
        console.log("AI result: ", parsed.content.replace(/\n/g, ''));
    })
    .catch((error) => {
        console.error("Error occurred:", error);
    });
})
.catch((error) => {
    console.error("Error occurred:", error);
});