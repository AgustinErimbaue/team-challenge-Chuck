const btnJoke = document.getElementById("botonChiste");
const jokeDiv = document.getElementById('chiste');

let listaChiste = JSON.parse(localStorage.getItem("listaChiste")) || [];

const showJoke = (e) => {
    e.preventDefault();
    axios.get("https://api.chucknorris.io/jokes/random")
    .then((res) => {
        const chiste = res.data.value;
        listaChiste.push(chiste);
        localStorage.setItem("listaChiste", JSON.stringify(listaChiste));
        printJoke();
    })
    .catch((err) => console.error(err));
};

const printJoke = () => {
    jokeDiv.innerHTML = ""; 
    listaChiste.forEach((value, index) => {
       
        jokeDiv.innerHTML += `
            <div>${value}</div>
            <button id="delete-btn-${index}" class="delete-btn">Delete</button>
        `;
    });
    attachDeleteListeners(); 
};

const attachDeleteListeners = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            deleteJoke(index); 
        });
    });
};

const deleteJoke = (index) => {
    listaChiste.splice(index, 1); 
    localStorage.setItem("listaChiste", JSON.stringify(listaChiste)); 
    printJoke(); 
};

btnJoke.addEventListener("click", showJoke);
