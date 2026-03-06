const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHbL2eliU3wOpLD2IetYhfH8HDFZFxCxq3W3R66lkQgTg1VEHY2wghJUFMBVJ4FjGYKw/exec";

const cursosPorArea = {
    gestion_humana: ["Inducción", "Cultura Pozuelo"],
    produccion: ["BPM", "Seguridad en Máquinas"],
    calidad: ["Inocuidad", "HACCP"],
    sig: ["Sistemas de Gestión"],
    sst: ["Trabajo en Altura", "LOTO", "Riesgo Químico"],
    brigada: ["Primeros Auxilios"],
    mdeo: ["Metodología MDEO"]
};

// 1. LÓGICA DE VERIFICACIÓN
document.getElementById('btn-verify').onclick = async function() {
    const code = document.getElementById('employeeCode').value;
    if(!code) return alert("Por favor, ingresa tu código.");
    
    this.innerText = "Verificando...";
    
    try {
        const res = await fetch(SCRIPT_URL + "?code=" + code);
        const data = await res.json();
        
        if (data.encontrado) {
            document.getElementById('welcome-screen').style.display = 'none';
            const formScreen = document.getElementById('form-screen');
            formScreen.style.display = 'block';
            document.getElementById('greeting-text').innerText = "¡Bienvenido, " + data.nombre.toUpperCase() + "!";
        } else {
            alert("Código no encontrado");
            this.innerText = "Verificar Código";
        }
    } catch (e) {
        alert("Error de conexión con la base de datos");
        this.innerText = "Verificar Código";
    }
};

// 2. CURSOS DINÁMICOS
document.getElementById('trainingArea').onchange = function(e) {
    const lista = cursosPorArea[e.target.value] || [];
    const selectCurso = document.getElementById('course');
    selectCurso.innerHTML = '<option value="" disabled selected>Seleccione el curso</option>';
    lista.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.innerText = c;
        selectCurso.appendChild(opt);
    });
};