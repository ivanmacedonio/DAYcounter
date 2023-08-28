let events = [];
let arr = [];
const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");


const json = load() ///almacenamos la data guardada

try{
    arr = JSON.parse(json) ///la serializamos en json
} catch (error){
    arr = []
}
events = arr?[... arr] :[]///con ... copiamos toda la data de un arreglo y la cargamos en otro facilmente

renderEvents()

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});

buttonAdd.addEventListener("click", (e) => {
    e.preventDefault();
    addEvent();
  });

function addEvent() {
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }

  if (dateDiff(eventDate.value) < 0) {
    ///si la fecha es negativa
    return;
  }

  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };
  events.unshift(newEvent);

  save(JSON.stringify(events)) ///guardamos el evento en formato json string

  eventName.value = "";

  renderEvents();
}

function dateDiff(d) { ///muestra el numero de dias restantes
  const targetDate = new Date(d);
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime(); ///get time retorna tiempo en numeros
  const days = Math.ceil(difference / (1000 * 3600 * 24)); ///ceil redondea, la cuenta en dias el tiempo
  return days;
}

function renderEvents(){
    const eventsHTML = events.map(event => {
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number"> ${dateDiff(event.date)}</span>
                    <span class="days-text">Dias</span>
                </div>

                <div class="event-name">${event.name}</div>
                <div class="actions"> 
                    <button class="bDelete" data-id= "${event.id}">Delete</button>
                </div>
                
                
            </div>
        `

        
    })
    eventsContainer.innerHTML = eventsHTML.join("")
    ///54 le enviamos el id del evento actual para saber que elemento eliminar
    document.querySelectorAll('.bDelete').forEach(button => {
        button.addEventListener('click', (e)=> {
            const id = button.getAttribute('data-id')
            events = events.filter(event => event.id !== id)
            renderEvents()
        })
    })
}

function save(data){ ///almacenar data en el cache
    localStorage.setItem('items', data)
}

function load(){ ///trae la data
    return localStorage.getItem('items')
}


