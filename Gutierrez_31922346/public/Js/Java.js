let Equipo = document.getElementById("Equipo");
let boton = document.getElementById("Boton");
let listaDeEquipo = document.getElementById("Participando");
let Equipos = JSON.parse(localStorage.getItem("Equipos")) || [];
document.getElementById("boton1").addEventListener("click", () => setStage(8));
document.getElementById("boton2").addEventListener("click", () => setStage(16));
let tablaDelTorneo = document.getElementById("tabla");
let botonIniciarTorneo = document.getElementById("iniciarTorneo")
let stage = 0;   

function setStage(value) {
	stage = value;
	console.log("cantidad de equipos a participar: " + stage);
}
Equipos.map((Equipo) => {
    listaDeEquipo.innerHTML += `<div>
    		<div class="borrar">
    			${Equipo}
    			
    			<button 
    				class="boton-borrar"
    				id="boton-de-borrar"
				>
					x
				</button>
    		</div>
    	</div>`
    });
listaDeEquipo.addEventListener("click", function(event) {
	if (event.target.classList.contains("boton-borrar")) {
		const borrarDiv = event.target.parentElement; 	
		if (borrarDiv) {
			const equipoAEliminar = borrarDiv.textContent.trim().replace("x", "").trim();	
			Equipos = Equipos.filter(equipo => equipo !== equipoAEliminar);
			localStorage.setItem("Equipos", JSON.stringify(Equipos));
			listaDeEquipo.innerHTML = '';
			Equipos.map((Equipo) => {
				listaDeEquipo.innerHTML += `<div>
					<div class="borrar">
						${Equipo}
							
						<button 
							class="boton-borrar"
							id="boton-de-borrar"
						>
							x
						</button>
					</div>
				</div>`;
});
		} else {
			console.error("El elemento padre del botón no se encontró.");
		}
	}
});
function verificarEquipos() {
	if (Equipos.length >= stage && stage > 0) {
		alert(`El límite de equipos para esta etapa (${stage}) ya ha sido alcanzado.`);
		boton.disabled = true;
	} else {
		boton.disabled = false;
	}
}
boton.addEventListener("click", function () {
    let EquipoComputado = Equipo.value;
    if(Equipo.value==""){
        alert("Ingrese un equipo")
       return false
    }
    Equipos.push(EquipoComputado);
    localStorage.setItem("Equipos", JSON.stringify(Equipos));
    Equipo.value="";
    listaDeEquipo.innerHTML = '';
    Equipos.map((Equipo) => {
    	listaDeEquipo.innerHTML += `<div>
    		<div class="borrar">
    			${Equipo}
    			
    			<button 
    				class="boton-borrar"
    				id="boton-de-borrar"
				>
					x
				</button>
    		</div>
    	</div>`
    });
});
function crearTabla(equipos) {
    tablaDelTorneo.innerHTML = "";
    equipos.forEach((equipo, index) => {
        tablaDelTorneo.innerHTML += 
		`<div class="partido">
            Partido ${Math.floor(index / 2) + 1}: <strong>${equipo}</strong>
        </div>`;
    });
}
function iniciarTorneo() {
    let faseEquipos = [...Equipos];
    let ronda = 1;

    while (faseEquipos.length > 1) {
        alert(`Iniciando ronda ${ronda}`);
        let ganadores = [];
		for (let i = 0; i < faseEquipos.length; i += 2) {
            let ganador = faseEquipos[i + 1]
                ? faseEquipos[Math.random() < 0.5 ? i : i + 1]
                : faseEquipos[i];
            ganadores.push(ganador);
        }
        crearTabla(ganadores);
        faseEquipos = ganadores;
        ronda++;
    }
    alert(`¡El ganador del torneo es: ${faseEquipos[0]}!`);
}
crearTabla(Equipos);
botonIniciarTorneo.addEventListener("click", iniciarTorneo);