const autocompleteConfig = {
    renderOption(movie){
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
        <img src="${imgSrc}">
        ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerm){
        const response = await axios.get("https://www.omdbapi.com/",{

        params : {                  //_ @params - automatically appends keys in url
            apikey : '89078b54',    //- use lowercase letters to append in url
            s : searchTerm
        }
    });

    if(response.data.Error){        //_ If we can't find any movies, show empty array
        return []
    }

    return response.data.Search
    }
}

createAutocomplete({
    ...autocompleteConfig,
    root : document.querySelector("#left-autocomplete"),
    onOptionSelect(movie){
        onMovieSelect(movie, document.querySelector("#left-summary"), 'left');
        document.querySelector(".tutorial").classList.add("is-hidden");
    }
});

createAutocomplete({
    ...autocompleteConfig,
    root : document.querySelector("#right-autocomplete"),
    onOptionSelect(movie){
        onMovieSelect(movie, document.querySelector("#right-summary"), 'right');
        document.querySelector(".tutorial").classList.add("is-hidden");
    }
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get("https://www.omdbapi.com/",{
        params : {
            apikey : '89078b54',
            i : movie.imdbID
        }
    })
    summaryElement.innerHTML = movieTemplate(response.data);

    if(side === 'left'){
        leftMovie = response.data;
    }else{
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie){
        runComparison();
    }

}

const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftSideStat, index)=>{
        const rightSideStat = rightSideStats[index];

        const leftSide = parseInt(leftSideStat.dataset.value);
        const rightSide = parseInt(rightSideStat.dataset.value);

        if(leftSide > rightSide){
            rightSideStat.classList.remove('is-primary');
            rightSideStat.classList.add('is-warning');
        }else if(leftSide < rightSide){
            leftSideStat.classList.remove('is-primary');
            leftSideStat.classList.add('is-warning');
        }else{
            leftSideStat.classList.remove('is-primary');
            leftSideStat.classList.add('is-warning');
            rightSideStat.classList.remove('is-primary');
            rightSideStat.classList.add('is-warning');
        }
    })
}

const movieTemplate = movieDetail => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    const metaScore = parseInt(movieDetail.Metascore)
    const imdbRating = parseFloat(movieDetail.imdbRating)
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''))
    const awards = movieDetail.Awards.split(' ').reduce((prev,word)=>{
        const value = parseInt(word)
        if(isNaN(word)){
            return prev;
        }else{
            return prev + value;
        }
    }, 0);

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metaScore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}