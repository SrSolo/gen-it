document.getElementById('imageForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const apiKey = formData.get('apiKey');
    const textPrompt = formData.get('textPrompt');
    const imageSize = formData.get('imageSize'); // Get selected image size
  
    const requestData = {
      apiKey,
      textPrompt,
      imageSize // Include image size in the request data
    };
  
    try {
      const response = await fetch('/api/generate_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
  
      // Check if the data property is present in the response
      if (!responseData.data) {
        throw new Error('Data property not found in the response');
      }
  
      // Display the full response data
    //   const outputContainer = document.getElementById('output');
    //   outputContainer.innerHTML = `<pre>${JSON.stringify(responseData, null, 2)}</pre>`;
  
      // Check if the imageURL is present in the response data
      const imageURL = responseData.data[0]?.url;
  
      if (!imageURL) {
        throw new Error('Generated image URL not found in the response');
      }
  
      // Display the generated image
      const imgElement = document.createElement('img');
      imgElement.src = imageURL;
      imgElement.alt = 'Generated Image';
  
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = ''; // Clear previous image, if any
      imageContainer.appendChild(imgElement);
    } catch (error) {
      console.error('Error:', error);
      const outputContainer = document.getElementById('output');
      outputContainer.innerHTML = 'An error occurred while generating the image.';
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = ''; // Clear previous image, if any
    }
  });
  