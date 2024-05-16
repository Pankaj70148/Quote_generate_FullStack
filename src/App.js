import React, { useState } from 'react';

const QuoteComponent = () => {
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    


    const fetchQuote = async () => {
        try {
            const response = await fetch(`https://api.quotable.io/random?author=${author}`);
            const data = await response.json();
            setQuote(data.content);

        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    const handleSaveQuote = async () => {
        try {
           
            const response = await fetch('http://localhost:5000/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author, quote })
                      
            });

            const result=  await response.json();
            console.log(result)
            alert("Quote saved successfully")
            
            if (response) {
                alert("Quote saved successfully")
                console.log('Quote saved successfully');
            } else {
                console.error('Failed to save quote');
                alert("Failed")
            }
        } 
        catch (error) {                             
            console.error('Error saving quote:', error);
        }
      

      
    };

    const handleChange = (event) => {
        setAuthor(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={author}
                onChange={handleChange}
                placeholder="Enter author name"
            />
            <button onClick={fetchQuote}>Get Quote</button>
            <button onClick={handleSaveQuote}>Save Quote</button>
           

            {quote && (
                <div>
                    <h2>Quote by {author}:</h2>
                    <p>{quote}</p>
                </div>
            )}
        </div>
    );
};

export default QuoteComponent;
