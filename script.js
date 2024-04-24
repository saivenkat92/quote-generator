const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading animation 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//  Hide Loading or complete Loading 
function complete (){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// New Quote
function newQuote() {
    loading();
    // Picking a random quote from apiQuotes Array 
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if Author is blank rename it as unknown 
    if (!quote.author) {
        authorText.textContent = 'Unkown';
    }else {
        authorText.textContent = quote.author;
    }
    // Check Quote length for styling 
    if (quote.text.length > 70) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader 
    complete();
    quoteText.textContent = quote.text;
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
    //  Catch Error Here
    }
}

// Tweet a Quote in Twitter
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Page Loading
getQuotes();