document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonInput').value.trim();
    fetchPokemon(pokemonName);
});

function fetchPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => createPokemonCard(data))
    .catch(error => console.error('Error fetching data: ', error));
}

function createPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemonContainer');
    const card = document.createElement('div');
    card.className = 'pokemonCard';

    const image = document.createElement('img');
    image.src = pokemonData.sprites.front_default;
    image.alt = `Image of ${pokemonData.name}`;
    card.appendChild(image);

    const name = document.createElement('p');
    name.textContent = `Name: ${pokemonData.name}`;
    card.appendChild(name);

    const id = document.createElement('p');
    id.textContent = `ID: ${pokemonData.id}`;
    card.appendChild(id);

    const updateForm = document.createElement('form');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = pokemonData.name;
    updateForm.appendChild(input);

    const updateButton = document.createElement('button');
    updateButton.type = 'submit';
    updateButton.textContent = 'Update';
    updateForm.appendChild(updateButton);

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        updatePokemon(card, input.value);
    });

    card.appendChild(updateForm);
    pokemonContainer.appendChild(card);
}

function updatePokemon(card, newName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${newName}`)
    .then(response => response.json())
    .then(data => {
        card.querySelector('img').src = data.sprites.front_default;
        card.querySelector('img').alt = `Image of ${data.name}`;
        card.querySelector('p').textContent = `Name: ${data.name}`;
        card.querySelectorAll('p')[1].textContent = `ID: ${data.id}`;
        card.querySelector('input').value = data.name;
    })
    .catch(error => console.error('Error updating Pokemon: ', error));
}
