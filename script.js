const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// function show new quote
function newQuote(){
    loading();
    // random index
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // try to check author
    if(!quote.author){
        authorText.textContent="Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // check  quote length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error
    }
}

// Tweet Quote
function tweetQuote(){
    const twiterUrl = `https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twiterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote)

//  on load
getQuotes();




