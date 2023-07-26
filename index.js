
document.getElementById('imageForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const apiKey = formData.get('apiKey');
    const textPrompt = formData.get('textPrompt');
  
    const requestData = {
      apiKey,
      textPrompt
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
      console.log('OpenAI API Response:', responseData);
  
      // Extract the image URL from the response data
      const imageURL = responseData.data[0]?.url;
  
      // Create an <img> element and set its src attribute to the imageURL
      const imgElement = document.createElement('img');
      imgElement.src = imageURL;
      imgElement.alt = 'Generated Image';
  
      // Display the image on the frontend
      const imageContainer = document.getElementById('imageContainer');
      imageContainer.innerHTML = ''; // Clear previous image, if any
      imageContainer.appendChild(imgElement);
  
    } catch (error) {
      console.error('Error:', error);
      const outputContainer = document.getElementById('output');
      outputContainer.innerHTML = 'An error occurred while generating the image.';
    }
  });
  