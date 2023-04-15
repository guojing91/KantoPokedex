// //Get all dropdowns from the document
// const dropdowns = document.querySelectorAll('.dropdown');

// //Loop through all dropdown elements
// dropdowns.forEach(dropdown => {
//     //Get inner elements from each dropdown
//     const select = document.querySelector('.select');
//     const caret = document.querySelector('.caret');
//     const menu = document.querySelector('.menu');
//     const options = document.querySelectorAll('.menu li');
//     const selected = document.querySelector('.selected');

//     /* this method is used if we have more than one dropdown menu on the page */

//     //Add a click event to the select element
//     select.addEventListener('click', () => {
//         //Add the 'select-clicked' class to apply styles to the select element
//         select.classList.toggle('select-clicked');
//         //Add the 'caret-rotate' class to apply styles to the caret element
//         caret.classList.toggle('caret-rotate');
//         //Add the 'menu-open' class to aply styles to the menu element
//         menu.classList.toggle('menu-open');
//     })

//     //Loop through all options elements
//     options.forEach(option => {
//         //Add a click event to the option element
//         option.addEventListener('click', () => {
//             //Change selected inner text to the clicked option inner text
//             selected.innerText = option.innerText;
//             //Remove 'select-clicked' class to remove styles from select element
//             select.classList.remove('select-clicked');
//             //Remove 'caret-rotate' class to remove styles from caret element
//             caret.classList.remove('caret-rotate');
//             //Remove 'menu-open' class to remove styles from menu element
//             menu.classList.remove('menu-open');
//             //Remove active class from all option elements
//             options.forEach(option => {
//                 option.classList.remove('active');
//             });
//             //Add 'active' class to apply styles to the clicked element
//             option.classList.add('active');



// Get the dropdown button and content
var dropdownBtn = document.querySelector(".dropdown-btn");
var dropdownContent = document.querySelector(".dropdown-content");

// When the dropdown button is clicked, show or hide the dropdown content
dropdownBtn.addEventListener("click", function () {
    dropdownContent.classList.toggle("show");
});

// Get the search box and list items
var searchBox = dropdownContent.querySelector("input");
var listItems = dropdownContent.querySelectorAll("li");

// When the user types into the search box, filter the list items
searchBox.addEventListener("keyup", function () {
    var filter = searchBox.value.toUpperCase();
    for (var i = 0; i < listItems.length; i++) {
        var item = listItems[i];
        if (item.innerHTML.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    }
});

// When a list item is clicked, set its text as the dropdown button text and hide the dropdown content
for (var i = 0; i < listItems.length; i++) {
    var item = listItems[i];
    item.addEventListener("click", function () {
        dropdownBtn.innerHTML = this.innerHTML;
        dropdownContent.classList.remove("show");




        //Change selected text to lower case to put into url
        const pokemonName = (dropdownBtn.innerHTML).toLowerCase();
        // console.log(pokemonName);
        //Put name into url to get image from API
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
            .then(response => response.json())
            .then(data => {
                document.getElementById('front-default').src = `${data.sprites.front_default}`;
                document.getElementById('front-shiny').src = `${data.sprites.front_shiny}`;
                document.getElementById('back-default').src = `${data.sprites.back_default}`;
                document.getElementById('back-shiny').src = `${data.sprites.back_shiny}`;
                var type1Name = data.types[0].type.name;
                var type1 = type1Name.charAt(0).toUpperCase() + type1Name.slice(1).toLowerCase();
                document.getElementById('first-type').innerText = type1;
                if (data.types.length === 1) {
                    document.getElementById('second-type').innerText = '-';
                } else {
                    var type2Name = data.types[1].type.name;
                    var type2 = type2Name.charAt(0).toUpperCase() + type2Name.slice(1).toLowerCase();
                    document.getElementById('second-type').innerText = type2;
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
                document.getElementById('stats-hp').style.cssText = `width: ${statsHP / 200 * 100}%; background-color: #04AA6D`;
                document.getElementById('stats-attack').style.cssText = `width: ${statsAtt / 200 * 100}%; background-color: #2196F3`;
                document.getElementById('stats-defense').style.cssText = `width: ${statsDef / 200 * 100}%; background-color: #F44336`;
                document.getElementById('stats-spatt').style.cssText = `width: ${statsSpAtt / 200 * 100}%; background-color: #B434EB`;
                document.getElementById('stats-spdef').style.cssText = `width: ${statsSpDef / 200 * 100}%; background-color: #EB9B34`;
                document.getElementById('stats-speed').style.cssText = `width: ${statsSpd / 200 * 100}%; background-color: #5E420C`;
                document.getElementById('total-stats').innerText = `Total = ${statsHP + statsAtt + statsDef + statsSpAtt + statsSpDef + statsSpd}`;

                var newMethodMoveName = [];
                var newMethodMoveLevel = [];
                for (var j = 0; j < data.moves.length; j++) {
                    for (var i = 0; i < data.moves[j].version_group_details.length; i++) {
                        if (data.moves[j].version_group_details[i].version_group.name === 'lets-go-pikachu-lets-go-eevee' && data.moves[j].version_group_details[i].move_learn_method.name === 'level-up' && data.moves[j].version_group_details[i].level_learned_at != 0) {
                            var str = data.moves[j].move.name;
                            var newStr = str.replace(/(^|-)([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);
                            var finalStr = newStr.replace('-', ' ');
                            newMethodMoveName.push(finalStr);

                            newMethodMoveLevel.push(data.moves[j].version_group_details[i].level_learned_at);
                        };
                    };
                }
                // console.log(newMethodMoveName);
                // console.log(newMethodMoveLevel);

                document.getElementById('table-body').innerHTML = '';
                for (var i = 0; i < newMethodMoveName.length; i++) {
                    document.getElementById('table-body').innerHTML += `<td>${newMethodMoveLevel[i]}</td><td>${newMethodMoveName[i]}</td>`;
                };

                function sortTable(n) {
                    var table, rows, switching, i, x, y, shouldSwitch, switchcount = 0;
                    table = document.getElementById('table-body');
                    switching = true;
                    while (switching) {
                        switching = false;
                        rows = table.getElementsByTagName("tr");
                        for (i = 0; i < (rows.length - 1); i++) {
                            shouldSwitch = false;
                            x = parseFloat(rows[i].getElementsByTagName("td")[n].innerHTML);
                            y = parseFloat(rows[i + 1].getElementsByTagName("td")[n].innerHTML);
                            if (x > y) {
                                shouldSwitch = true;
                                break;
                            }
                        }
                        if (shouldSwitch) {
                            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                            switching = true;
                            switchcount++;
                        }
                    }
                }

                sortTable(0);

                var table = document.getElementById('table-body');
                var rows = table.querySelectorAll('tr');
                var originalString;
                var modifiedString;
                var moveData;
                var moveText;

                rows.forEach(row => {
                    var cellsInRow = row.querySelectorAll('td');
                    cellsInRow[1].addEventListener('click', function() {
                        originalString = cellsInRow[1].innerText;
                        modifiedString = originalString.toLowerCase().replace(' ', '-');
                        // console.log(modifiedString);

                        for (var i = 0; i < data.moves.length; i++) {
                            if (data.moves[i].move.name === modifiedString) {
                                moveData = data.moves[i].move.url;
                            }
                        }

                        fetch(moveData)
                            .then(results => results.json())
                            .then(details => {
                                for (var i = 0; i < details.flavor_text_entries.length; i++) {
                                    if (details.flavor_text_entries[i].version_group.name === 'ultra-sun-ultra-moon' && details.flavor_text_entries[i].language.name === 'en') {
                                        moveText = details.flavor_text_entries[i].flavor_text;
                                    }
                                }
                                console.log(`
                                    Move Name = ${originalString}
                                    Type = ${details.type.name}
                                    Base Power = ${details.power}
                                    Accuracy = ${details.accuracy}
                                    Damage Class = ${details.damage_class.name}
                                    Effects = ${details.effect_entries[0].effect}
                                    Description = ${moveText}
                                    `);
                            })
                    });
                });

            });
    });
};
//         });
//     });
// });


// Testing

// fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
//     .then(response => response.json())
//     .then(data => {
//         // var movesTable = data.moves.filter(moveset => moveset.version_group_details[0].move_learn_method.name === 'level-up');
//         // console.log(movesTable);
//         var newMethodMoveName = [];
//         var newMethodMoveLevel = [];
//         for (var j = 0; j < data.moves.length; j++) {
//             for (var i = 0; i < data.moves[j].version_group_details.length; i++) {
//                 if (data.moves[j].version_group_details[i].version_group.name === 'lets-go-pikachu-lets-go-eevee' && data.moves[j].version_group_details[i].move_learn_method.name === 'level-up') {
//                     var str = data.moves[j].move.name;
//                     var newStr = str.replace(/(^|-)([a-z])/g, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);
//                     var finalStr = newStr.replace('-', ' ');
//                     newMethodMoveName.push(finalStr);

//                     newMethodMoveLevel.push(data.moves[j].version_group_details[i].level_learned_at);
//                 };
//             };
//         }
//         console.log(newMethodMoveName);
//         console.log(newMethodMoveLevel);
//     });
