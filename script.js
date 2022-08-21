let nPlayers=0
let players = []
let addPlayers= []
let addReStockPlayers = []
let dreamTeam = []
const team1 = []
const team2 = []
const form = document.getElementById('idForm')

const fragment = document.createDocumentFragment()
// Const para el boton que muestra a los jugadores cargados (Sector ABM Jugadores)
const botonJugadores = document.getElementById('idBotonJugadores')

// div para mostrar los jugadores del localStorage
const divJugadores = document.getElementById('divJugadores')
const divAgregarJugadores = document.getElementById('divAgregarJugadores')
// div alerta jugador ya cargado
const divAlert = document.getElementById('divAlert')

// Const para los botones de generacion de equipos
const botonEquipo5 = document.getElementById('idBotonEquipo5')
const botonEquipo7 = document.getElementById('idBotonEquipo7')
const botonEquipo9 = document.getElementById('idBotonEquipo9')
const botonEquipo11 = document.getElementById('idBotonEquipo11')

// const para los templates
const templateFooter = document.getElementById('template-footer').content
const templatePlayers = document.getElementById('template-jugadores').content

// const de la tabla que muestra los jugadores seleccionados
const tablePlayers = document.getElementById('tablePlayers')
const tableFooter = document.getElementById('tableFooter')


const jugadoresCargados = document.getElementById('loadedPlayers')

// Constantes para las tablas de equipos ya generados
const tablaEquipo1 = document.getElementById("tablaEquipo1")
const tablaEquipo2 = document.getElementById("tablaEquipo2")
const tablaJugadoresAgregados = document.getElementById('tablaJugadoresAgregados')


// CARGO LA BASE CON JUGADORES CARGADOS
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})
const fetchData = async () => {
    try {
        const res = await fetch('./json/ghostPlayers.json')
        const data = await res.json()
        dreamTeam = data
    } catch(error){
        console.log(error)
    }
}

// CARGO LOCALSTORAGE
if(localStorage.getItem('storageJugadores')){
    players = JSON.parse(localStorage.getItem('storageJugadores'))
}else{
    localStorage.setItem('storageJugadores', JSON.stringify(players))
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Evento de click que dispara el modal en el boton "Cargar Jugadores"
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const player = new Player(document.getElementById('idNombre').value, document.getElementById('idApellido').value, document.getElementById('idEdad').value, document.getElementById('idEstadistica').value, document.getElementById('idPosicion').value)
    players.push(player)
    localStorage.setItem('storageJugadores', JSON.stringify(players))
    form.reset()
    
    // Voy mostrando cada jugador nuevo que cargo
    let jugadoresStorage = JSON.parse(localStorage.getItem('storageJugadores'))
    divJugadores.innerHTML = " "
    jugadoresStorage.forEach((player,indice) => {
        divJugadores.innerHTML += `
        <div class="card text-white bg-primary mb-3 tarea" id="player${indice}" style="max-width: 20rem;">
            <div class="card-header">Tarjeta del Jugador</div>
            <div class="card-body">
                <h4 class="card-title">${player.name} ${player.lastName}</h4>
                <p class="card-text">Edad: ${player.age}</p>
                <p class="card-text">Estadistica: ${player.stats}</p>
                <p class="card-text">Posicion: ${player.position}</p>
                <p class="card-text">ID: ${player.id}</p>
                <button class="btn btn-danger">Eliminar Jugador</button>
            </div>
        </div>`
    })
    jugadoresStorage.forEach((player,indice) =>{
        document.getElementById(`player${indice}`).lastElementChild.lastElementChild.addEventListener('click', () =>{
            document.getElementById(`player${indice}`).remove()
            players.splice(indice,1)
            localStorage.setItem('storageJugadores',JSON.stringify(players))   
         })

    })
})

// Boton para mostrar todos los jugadores cargados
botonJugadores.addEventListener('click', () => {

    let jugadoresStorage = JSON.parse(localStorage.getItem('storageJugadores'))
    divJugadores.innerHTML = " "
    jugadoresStorage.forEach((player,indice) => {
        divJugadores.innerHTML += `
        <div class="card text-white bg-primary mb-3 tarea" id="player${indice}" style="max-width: 20rem;">
            <div class="card-header">Tarjeta del Jugador</div>
            <div class="card-body">
                <h4 class="card-title">${player.name} ${player.lastName}</h4>
                <p class="card-text">Edad: ${player.age}</p>
                <p class="card-text">Estadistica: ${player.stats}</p>
                <p class="card-text">Posicion: ${player.position}</p>
                <p class="card-text">ID: ${player.id}</p>
                <button class="btn btn-danger">Eliminar Jugador</button>
            </div>
        </div>`
    })

    // Elimino Jugador
    jugadoresStorage.forEach((player,indice) =>{
        document.getElementById(`player${indice}`).lastElementChild.lastElementChild.addEventListener('click', () =>{
            document.getElementById(`player${indice}`).remove()
            players.splice(indice,1)
            localStorage.setItem('storageJugadores',JSON.stringify(players))   
         })

    })


})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Evento de click que dispara el modal en el boton "Crear Equipos"
jugadoresCargados.addEventListener('click', () =>{
    resetTeams()
    fetchData()
    //Cargo los jugadores para el modal de armado de equipo
    addReStockPlayers = JSON.parse(localStorage.getItem('storageJugadores'))
    
    //Arranca el funcionamiento del modal
    menuEquipos(addReStockPlayers)
    
})

// Menu de seleccion de jugadores para armado de equipos
const menuEquipos = (arrayPlayers) =>{
    // Reset del div que muestra los jugadores
    divAgregarJugadores.innerHTML = " "
    // Carga de los jugadores para agregar
    arrayPlayers.forEach((player,indice) => {
        divAgregarJugadores.innerHTML += `
        <div class="card border-success mb-3 tarea" id="player${indice}" style="max-width: 20rem;">
            <div class="card-header">TARJETA JUGADOR</div>
            <div class="card-body">
                <p class="card-text upper">${player.name} ${player.lastName}</p>
                <button class="btn btn-link">Agregar</button>
            </div>
        </div>`
    })
    // Funcion de boton agregar y carga en la tabla de los seleccionados
    arrayPlayers.forEach((player,indice) =>{
        document.getElementById(`player${indice}`).lastElementChild.lastElementChild.addEventListener('click', () =>{
            document.getElementById(`player${indice}`).remove()  
            templatePlayers.querySelectorAll('td')[0].textContent = player.name
            templatePlayers.querySelectorAll('td')[1].textContent = player.lastName
            templatePlayers.querySelectorAll('td')[2].textContent = player.age
            templatePlayers.querySelector('.btn-danger').setAttribute("id", "playerTable"+indice)
            const clone = templatePlayers.cloneNode(true)
            fragment.appendChild(clone)
            tablePlayers.appendChild(fragment)
            addPlayers.push(player)
            let findIndex= player.name+player.lastName+player.age
            let index = addReStockPlayers.findIndex((elemnt) =>elemnt.id===findIndex)
            addReStockPlayers.splice(index,1)
            cambiarFooter()       
         }
         )
    })
    } // FIN MENU EQUIPOS

// Evento de escucha para el boton "QUITAR" de la tabla
tablePlayers.addEventListener('click', e =>{
    btnQuitar(e)
})

// Funcionalidad del boton quitar
const btnQuitar = e =>{
    // Me aseguro de estar seleccionando al boton de quitar
    if(e.target.classList.contains('btn-danger')){
        addPlayers.forEach((player,indice) =>{
            if(player.name===e.target.parentNode.parentNode.querySelectorAll('td')[0].textContent && player.lastName===e.target.parentNode.parentNode.querySelectorAll('td')[1].textContent){
                let eliminated=addPlayers.splice(indice,1)
                for(let i=0;i<eliminated.length;i++){
                    addReStockPlayers.push(eliminated[i])
                }         
            }
        })  
        e.target.parentNode.parentNode.remove()
        cambiarFooter()
    }
    e.stopPropagation() 
}

// Funcion que modifica el footer de la tabla
const cambiarFooter = () =>{
    // Reseteo la tabla
    tableFooter.innerHTML=``
    // Si no hay jugadores en la tabla cambio el footer
    if (addPlayers == 0){
        tableFooter.innerHTML=`
        <th scope="col" colspan="5">Ningun jugador seleccionado - Seleccione Jugadores para comenzar!</th>
        `
        menuEquipos(players)
    } else{
        // Si hay jugadores en la tabla, los muestro
        nPlayers = (addPlayers.length)
        templateFooter.querySelectorAll('td')[0].textContent = nPlayers
        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        tableFooter.appendChild(fragment)
        menuEquipos(addReStockPlayers)
    }
    // Si se selecciona vaciar todos los jugadores, reseteo la tabla
    if (!!document.getElementById('vaciar-jugadores')){
        const btnVaciar = document.getElementById('vaciar-jugadores')
        btnVaciar.addEventListener('click', () =>{
        tablePlayers.innerHTML=''
        addPlayers.length=0
        addReStockPlayers = JSON.parse(localStorage.getItem('storageJugadores'))
        cambiarFooter()
    })
    }   
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Armado de equipos de futbol
botonEquipo5.addEventListener('click', () => {
    splitTeams(addPlayers)
    let suplentes = dreamTeam
    rellenarTeam1()
    rellenarTeam2()
    if(team1.length<4){

        let dif = 5-team1.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamUno = tablaEquipo1.insertRow(-1)
            teamUno.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamUno.className="table-secondary"
        }
    }else{
        rellenarTeam1()
    }
    if(team2.length<4){
        
        let dif = 5-team2.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamDos = tablaEquipo2.insertRow(-1)
            teamDos.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamDos.className="table-secondary"
        }
    }else{
        rellenarTeam2()
    }
})

botonEquipo7.addEventListener('click', () => {
    splitTeams(addPlayers)
    let suplentes = dreamTeam
    rellenarTeam1()
    rellenarTeam2()
    if(team1.length<6){

        let dif = 7-team1.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamUno = tablaEquipo1.insertRow(-1)
            teamUno.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamUno.className="table-secondary"
        }
    }else{
        rellenarTeam1()
    }
    if(team2.length<6){
        
        let dif = 7-team2.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamDos = tablaEquipo2.insertRow(-1)
            teamDos.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamDos.className="table-secondary"
        }
    }else{
        rellenarTeam2()
    }
})

botonEquipo9.addEventListener('click', () => {
    splitTeams(addPlayers)
    let suplentes = dreamTeam
    rellenarTeam1()
    rellenarTeam2()
    if(team1.length<8){

        let dif = 9-team1.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamUno = tablaEquipo1.insertRow(-1)
            teamUno.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamUno.className="table-secondary"
        }
    }else{
        rellenarTeam1()
    }
    if(team2.length<8){
        
        let dif = 9-team2.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamDos = tablaEquipo2.insertRow(-1)
            teamDos.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamDos.className="table-secondary"
        }
    }else{
        rellenarTeam2()
    }
})

botonEquipo11.addEventListener('click', () => {
    splitTeams(addPlayers)
    let suplentes = dreamTeam
    rellenarTeam1()
    rellenarTeam2()
    if(team1.length<10){

        let dif = 11-team1.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamUno = tablaEquipo1.insertRow(-1)
            teamUno.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamUno.className="table-secondary"
        }
    }else{
        rellenarTeam1()
    }
    if(team2.length<10){
        
        let dif = 11-team2.length
        for(let i=0; i<dif; i++){
            let suplente = suplentes.pop()
            let teamDos = tablaEquipo2.insertRow(-1)
            teamDos.innerHTML += `
            <th scope="row">#</th>
            <td>${suplente.name}</td>
            <td>${suplente.lastName}</td>
            <td>${suplente.stats}</td>`
            teamDos.className="table-secondary"
        }
    }else{
        rellenarTeam2()
    }
})


function resetTeams(){
    team1.length=0
    team2.length=0
    tablaEquipo1.innerHTML=`<thead>
    <tr class="table-info">
        <th scope="col">EQUIPO 1</th>
        <th scope="col">NOMBRE</th>
        <th scope="col">APELLIDO</th>
        <th scope="col">ESTADISTICA</th>
    </tr>
</thead>
<tbody>
</tbody>`
    tablaEquipo2.innerHTML=`<thead>
    <tr class="table-danger">
        <th scope="col">EQUIPO 2</th>
        <th scope="col">NOMBRE</th>
        <th scope="col">APELLIDO</th>
        <th scope="col">ESTADISTICA</th>
    </tr>
</thead>
<tbody>
</tbody>`
    addPlayers.length=0
    tablePlayers.innerHTML=''
}

function rellenarTeam1(){
    team1.forEach((player,indice) => {
        let equipo1=tablaEquipo1.insertRow(-1)
        equipo1.innerHTML += `
        <th scope="row">${indice}</th>
        <td>${player.name}</td>
        <td>${player.lastName}</td>
        <td>${player.stats}</td>`
        equipo1.className="table-primary"
    })
}
function rellenarTeam2(){
    team2.forEach((player,indice) => {
        let equipo2=tablaEquipo2.insertRow(-1)
        equipo2.innerHTML += `
        <th scope="row">${indice}</th>
        <td>${player.name}</td>
        <td>${player.lastName}</td>
        <td>${player.stats}</td>`
        equipo2.className="table-warning"
    })
}

function splitTeams(jugadores){
    let players2=jugadores.slice()
    for(let i=0; i<(addPlayers.length);i++){
        let max= Math.max.apply(Math, players2.map(function(o){return o.stats;}))
        let objMax = players2.find(function(o){return o.stats == max;})
        let indexMax = players2.indexOf(objMax)
        if(i%2==0){
            team1.push(objMax)
        }else{
            team2.push(objMax)
        }
        players2.splice(indexMax, 1)
    }
}