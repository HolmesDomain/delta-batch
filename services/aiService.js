import http from 'http';
  
  export function makeAIRequest(data) {
    return new Promise((resolve, reject) => { 
      const postData = JSON.stringify({
        prompt: `As an customer, please summarize the sentiment of the reviews below in a paragraph: ${data}`,
        n_predict: 128
      });
    
      const options = {
          hostname: '127.0.0.1',
          port: 8080,
          path: '/completion',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
      }; 
    
      const req = http.request(options, (res) => {
          // console.log(`statusCode: ${res.statusCode}`);
          
          let responseData = '';
        
          res.on('data', (chunk) => {
            console.log(`Response data: ${chunk}`);
            responseData += chunk;
          });
        
          res.on('end', () => {
            console.log('No more data in response.');
            
            resolve(responseData);
          });
      });
      
      req.on('error', (error) => {
        console.error(`Error in request: ${error}`);
        reject(error); 
      });
      
      // Write the data to the request body
      req.write(postData);
      
      // End the request
      req.end();
    })
  };