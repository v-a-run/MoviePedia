const createAutocomplete = ({root, renderOption, onOptionSelect, inputValue, fetchData }) => {

    root.innerHTML = `
        <label><b> Search for Movie <b><label>
        <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    `;

    const input = root.querySelector(".input")
    const dropdown = root.querySelector(".dropdown")
    const resultsWrapper = root.querySelector(".results")
    
    const onInput = async event => {
        const items = await fetchData(event.target.value)

        if(!items.length){
            dropdown.classList.remove('is-active')
            return;
        }
        dropdown.classList.add("is-active")
        resultsWrapper.innerHTML = ""   //- clear results before searching new movie

        for (let item of items) {
            const option = document.createElement("a")
            option.classList.add("dropdown-item")
            option.innerHTML = renderOption(item);

            option.addEventListener("click", () => {
                dropdown.classList.remove('is-active')
                input.value = inputValue(item);
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option);          
        }
    }
    input.addEventListener("input", debounce(onInput, 500))

    //* To hide dropdown when clicked outside of it
    document.addEventListener("click", event => {
        if(!root.contains(event.target)){
            dropdown.classList.remove("is-active")
        }
    })
}