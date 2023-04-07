//Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');

//Loop through all dropdown elements
dropdowns.forEach(dropdown => {
    //Get inner elements from each dropdown
    const select = document.querySelector('.select');
    const caret = document.querySelector('.caret');
    const menu = document.querySelector('.menu');
    const options = document.querySelectorAll('.menu li');
    const selected = document.querySelector('.selected');
    
    /* this method is used if we have more than one dropdown menu on the page */

    //Add a click event to the select element
    select.addEventListener('click', () => {
        //Add the 'select-clicked' class to apply styles to the select element
        select.classList.toggle('select-clicked');
        //Add the 'caret-rotate' class to apply styles to the caret element
        caret.classList.toggle('caret-rotate');
        //Add the 'menu-open' class to aply styles to the menu element
        menu.classList.toggle('menu-open');
    })

    //Loop through all options elements
    options.forEach(option => {
        //Add a click event to the option element
        option.addEventListener('click', () => {
            //Change selected inner text to the clicked option inner text
            selected.innerText = option.innerText;
            //Remove 'select-clicked' class to remove styles from select element
            select.classList.remove('select-clicked');
            //Remove 'caret-rotate' class to remove styles from caret element
            caret.classList.remove('caret-rotate');
            //Remove 'menu-open' class to remove styles from menu element
            menu.classList.remove('menu-open');
            //Remove active class from all option elements
            options.forEach(option => {
                option.classList.remove('active');
            });
            //Add 'active' class to apply styles to the clicked element
            option.classList.add('active');

            //Change selected text to lower case to put into url
            const pokemonName = (selected.innerText).toLowerCase();
            console.log(pokemonName);
            //Put name into url to get image from API
            fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('front-default').src = `${data.sprites.front_default}`;
                    document.getElementById('front-shiny').src = `${data.sprites.front_shiny}`;
                    document.getElementById('back-default').src = `${data.sprites.back_default}`;
                    document.getElementById('back-shiny').src = `${data.sprites.back_shiny}`;
                    document.getElementById('first-type').innerText = `${data.types[0].type.name}`;
                    if (data.types.length === 1) {
                        document.getElementById('second-type').innerText = '-';
                    } else {
                        document.getElementById('second-type').innerText = `${data.types[1].type.name}`;
                    }
                    const statsHP = data.stats[0].base_stat;
                    const statsAtt = data.stats[1].base_stat;
                    const statsDef = data.stats[2].base_stat;
                    const statsSpAtt = data.stats[3].base_stat;
                    const statsSpDef = data.stats[4].base_stat;
                    const statsSpd = data.stats[5].base_stat;
                    document.getElementById('stats-hp').innerText = statsHP;
                    document.getElementById('stats-attack').innerText = statsAtt;
                    document.getElementById('stats-defense').innerText = statsDef;
                    document.getElementById('stats-spatt').innerText = statsSpAtt;
                    document.getElementById('stats-spdef').innerText = statsSpDef;
                    document.getElementById('stats-speed').innerText = statsSpd;
                    document.getElementById('stats-hp').style.cssText = `width: ${statsHP/200*100}%; background-color: #04AA6D`;
                    document.getElementById('stats-attack').style.cssText = `width: ${statsAtt/200*100}%; background-color: #2196F3`;
                    document.getElementById('stats-defense').style.cssText = `width: ${statsDef/200*100}%; background-color: #F44336`;
                    document.getElementById('stats-spatt').style.cssText = `width: ${statsSpAtt/200*100}%; background-color: #B434EB`;
                    document.getElementById('stats-spdef').style.cssText = `width: ${statsSpDef/200*100}%; background-color: #EB9B34`;
                    document.getElementById('stats-speed').style.cssText = `width: ${statsSpd/200*100}%; background-color: #5E420C`;
                    document.getElementById('total-stats').innerText = `Total = ${statsHP + statsAtt + statsDef + statsSpAtt + statsSpDef + statsSpd}`;
                });
        });
    });

});