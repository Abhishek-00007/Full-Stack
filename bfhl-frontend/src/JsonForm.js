import { useState } from 'react';

function JsonForm() {
  const [input, setInput] = useState('');  // To store JSON input as string
  const [file, setFile] = useState(null);  // To store the uploaded file
  const [error, setError] = useState('');  // To show error messages
  const [response, setResponse] = useState(null);  // To store API response

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      // Validate if input is valid JSON
      const parsedData = JSON.parse(input);

      // Create FormData object
      const formData = new FormData();
      formData.append('data', JSON.stringify(parsedData)); // Send JSON as string in 'data' field

      if (file) {
        formData.append('file_b64', file);  // Attach the file to 'file_b64' field
      }

      // Call backend API to process the form data
      const res = await fetch('http://localhost:3000/bfhl', {
        method: 'POST',
        body: formData  // Send form-data as body
      });

      const data = await res.json();  // Extract the response from backend
      setResponse(data);  // Store response for display
      setError('');  // Clear any previous error messages
    } catch (err) {
      // If JSON is invalid or API call fails, show error
      setError('Invalid JSON input or file upload failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input'
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}  // Set the file on file change
        />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}
      </form>

      {/* Display response from backend */}
      {response && (
        <div>
          <h3>Response from API:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default JsonForm;
