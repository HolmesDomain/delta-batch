import https from 'https';

export function callYelp(businessID) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.yelp.com',
      path: `/v3/businesses/${businessID}/reviews`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.API_Key}`,
        'Accept': 'application/json'
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          const reviews = response.reviews;
          let reviewList = [];

          for (const review of reviews) {
            reviewList.push(review.text.replace(/\n/g, ''));
          }

          resolve(reviewList); // Resolve the promise with the reviewList
        } catch (error) {
          reject(error); // If there is an error parsing the response, reject the promise
        }
      });
    });

    req.on('error', (error) => {
      reject(error); // If there is an error with the request, reject the promise
    });

    req.end();
  });
}
