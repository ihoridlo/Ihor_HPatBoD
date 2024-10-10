let currentIndex = 0;
let data = [];

// Fetch data from an API (for example, using a placeholder API)
async function fetchData() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        data = await response.json();
        displayData();
    } catch (error) {
        console.error('Error fetching data:', error);
    };
};

// Display data at the current index
function displayData() {
    const idNumber = document.getElementById('id');
    const nameData = document.getElementById('name');
    const imageLink = document.getElementById("image");
    const birthdateData = document.getElementById('birthdate');
    const speciesData = document.getElementById('species');
    const ancestryData = document.getElementById('ancestry');
    const wandData = document.getElementById('wand');
    const patronusData = document.getElementById('patronus');
    const inhogwartsData = document.getElementById('inhogwarts');
    const aliveData = document.getElementById('alive');

    if (data.length > 0) {

        idNumber.innerText = " (" + currentIndex + ")";
    
        nameData.innerText = data[currentIndex].name;

        imageLink.src = data[currentIndex].image;

        if (data[currentIndex].dateOfBirth != null) {
            birthdateData.innerText = data[currentIndex].dateOfBirth;
        } else {
            birthdateData.innerText = "[Date of birth is unknown]";
        };

        if (data[currentIndex].gender == "male") {
            speciesData.innerText = "Male " + data[currentIndex].species;
        } else {
            speciesData.innerText = "Female " + data[currentIndex].species;
        };

        // Ancestry, wand and patronus data for humans and half-humans
        if (data[currentIndex].species == "human" || data[currentIndex].species == "half-giant" || data[currentIndex].species == "werewolf") {
            let wizard = "";
            if (data[currentIndex].wizard == true) {
                if (data[currentIndex].gender == "male") {
                    wizard = "Wizard";    
                } else {
                    wizard = "Witch";
                };
            } else {
                wizard = "Non-wizard";
            };

            if (data[currentIndex].ancestry != "" && data[currentIndex].ancestry != "muggle") {
                ancestryData.innerText = wizard + ", " + data[currentIndex].ancestry;
            } else if (data[currentIndex].ancestry == "muggle") {
                ancestryData.innerText = "Muggle";
            } else {
                ancestryData.innerText = wizard + ", ancestry is unknown";
            };

            if (data[currentIndex].wand.length != null && data[currentIndex].ancestry != "muggle") {
                wandData.innerText = "Wand: " + data[currentIndex].wand.wood + ", " + data[currentIndex].wand.length + " inches, " + data[currentIndex].wand.core + " core";
            } else if (data[currentIndex].wand.length == null && data[currentIndex].ancestry != "muggle") {
                wandData.innerText = "[No data of the wand]";
            } else if (data[currentIndex].ancestry == "muggle") {
                wandData.innerText = "";
            };

            if (data[currentIndex].patronus != "" && data[currentIndex].ancestry != "muggle") {
                patronusData.innerText = "Patronus: " + data[currentIndex].patronus;
            } else if (data[currentIndex].patronus == "" && data[currentIndex].ancestry != "muggle") {
                patronusData.innerText = "[Patronus is unknown]";
            } else if (data[currentIndex].ancestry == "muggle") {
                patronusData.innerText = "";
            };
            
        } else {
            ancestryData.innerText = "";
            wandData.innerText = "";
            patronusData.innerText = "";
        };
        
        // Position in Hogwarts
        if (data[currentIndex].ancestry != "muggle") {
            let inhogwarts = "";
            let house = "";
            if (data[currentIndex].hogwartsStaff == true && data[currentIndex].hogwartsStudent == false) {
                inhogwarts = "staff";
            } else if (data[currentIndex].hogwartsStaff == false && data[currentIndex].hogwartsStudent == true) {
                inhogwarts = "student";
            } else {
                inhogwarts = "";
            };

            if (data[currentIndex].house != "") {
                house = data[currentIndex].house;
            } else {
                house = "";
            };

            if (inhogwarts != "" && house != "") {
                inhogwartsData.innerText = "In Hogwarts: " + inhogwarts + ", " + data[currentIndex].house;
            } else if (inhogwarts != "" && house == "") {
                inhogwartsData.innerText = "In Hogwarts: " + inhogwarts + ", unknown house";
            } else if (inhogwarts == "" && house != "") {
                inhogwartsData.innerText = "In Hogwarts: " + data[currentIndex].house;
            } else {
                inhogwartsData.innerText = "";
            };

        };
        
        if (data[currentIndex].alive == true) {
            aliveData.innerText = "Alive";
        } else {
            aliveData.innerText = "Dead";
        };

    };
};

// Handle key events
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % data.length;
        displayData();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        displayData();
    };
});

fetchData();