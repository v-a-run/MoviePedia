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
        onMovieSelect(movie, document.querySelector("#left-summary"));
        const sections = document.querySelectorAll(".tutorial");
        for(let section of sections){
            section.classList.add("is-hidden");
        }
    }
});

const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get("https://www.omdbapi.com/",{
        params : {
            apikey : '89078b54',
            i : movie.imdbID
        }
    })
    summaryElement.innerHTML = movieTemplate(response.data);

}

const movieTemplate = movieDetail => {

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1><em>${movieDetail.Title}</em></h1>
                    <h4><b>${movieDetail.Genre}</b></h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.Actors}</p>
            <p class="subtitle">Cast</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.Director}</p>
            <p class="subtitle">Director</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.Released}</p>
            <p class="subtitle">Release Date</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-info">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
}