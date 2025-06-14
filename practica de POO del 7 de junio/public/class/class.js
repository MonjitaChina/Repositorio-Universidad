class Vendedor {
    constructor(nombre, ID, ventas) {
        this.nombre = nombre;
        this.ID = ID;
        this.ventas = ventas;
    }

    calcularComision() {
        throw new Error("Método calcularComision debe ser implementado por las subclases.");
    }
}

class VendedorTiempoCompleto extends Vendedor {
    calcularComision() {
        return this.ventas <= 1000 ? this.ventas * 0.05 : this.ventas * 0.10;
    }
}

class VendedorPorContrato extends Vendedor {
    calcularComision() {
        return this.ventas * 0.15;
    }
}

document.getElementById("vendedorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let ID = parseInt(document.getElementById("ID").value);
    let ventas = parseFloat(document.getElementById("ventas").value);
    let tipo = document.getElementById("tipo").value;

    if (!nombre || isNaN(ID) || isNaN(ventas)) {
        alert("Por favor ingresa datos válidos.");
        return;
    }

    let vendedor;
    if (tipo === "TiempoCompleto") {
        vendedor = new VendedorTiempoCompleto(nombre, ID, ventas);
    } else if (tipo === "PorContrato") {
        vendedor = new VendedorPorContrato(nombre, ID, ventas);
    }

    document.getElementById("comisionven").innerHTML = `
        <p><strong>Nombre:</strong> ${vendedor.nombre}</p>
        <p><strong>ID:</strong> ${vendedor.ID}</p>
        <p><strong>Ventas:</strong> $${vendedor.ventas}</p>
        <p><strong>Tipo de Vendedor:</strong> ${tipo.replace("TiempoCompleto", "Tiempo Completo").replace("PorContrato", "Por Contrato")}</p>
        <p><strong>Comisión Calculada:</strong> $${vendedor.calcularComision().toFixed(2)}</p>
    `;
});