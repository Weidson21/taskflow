const input = document.getElementById("adicionarTarefa");
const btn = document.getElementById("adicionar");
const listAtivo = document.getElementById("addTask");
const listFeito = document.getElementById("concludeTasks");

// ===== LOCAL STORAGE =====
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ===== CRIAR ELEMENTO DA TAREFA =====
function criarElementoTarefa(tarefa) {
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox-grande");
    checkBox.id = tarefa.id;
    checkBox.checked = tarefa.concluida;

    const label = document.createElement("label");
    label.htmlFor = tarefa.id;
    label.textContent = tarefa.texto;
    label.classList.add("label");

    const img = document.createElement("img");
    img.width = 25;
    img.height = 25;
    img.src = "trash-can.png";
    img.alt = "Remover tarefa";
    img.classList.add("img");

    const li = document.createElement("li");
    li.classList.add("li");

    if (tarefa.concluida) {
        li.classList.add("lista-riscada");
        listFeito.appendChild(li);
    } else {
        listAtivo.appendChild(li);
    }

    // ===== EVENTOS =====
    checkBox.addEventListener("change", () => {
        tarefa.concluida = checkBox.checked;

        if (checkBox.checked) {
            listFeito.appendChild(li);
            li.classList.add("lista-riscada");
        } else {
            listAtivo.appendChild(li);
            li.classList.remove("lista-riscada");
        }

        salvarLocalStorage();
    });

    img.addEventListener("click", () => {
        li.remove();
        tarefas = tarefas.filter(t => t.id !== tarefa.id);
        salvarLocalStorage();
    });

    li.append(checkBox, label, img);
}

// ===== BOTÃO ADICIONAR =====
btn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    const tarefa = {
        id: Date.now(),
        texto: input.value.trim(),
        concluida: false
    };

    tarefas.push(tarefa);
    salvarLocalStorage();
    criarElementoTarefa(tarefa);

    input.value = "";
});

// ===== CARREGAR TAREFAS AO ABRIR =====
tarefas.forEach(tarefa => {
    criarElementoTarefa(tarefa);
});