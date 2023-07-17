// taken from https://stackoverflow.com/a/40384602
const interleave = ([x, ...xs], ...rest) =>
    x === undefined
        ? rest.length === 0
            ? []                                // base: no x, no rest
            : interleave(...rest)              // inductive: no x, some rest
        : [x, ...interleave(...rest, xs)];  // inductive: some x, some rest


function createTableButtons() {
    let newdivs = [];
    var table;
    for (let i = 0; i < tables.length; i++) {
        table = tables[i];
        console.assert(true, 'name' in table.dataset);
        if ('name' in table.dataset) {
            var newdiv = document.createElement('button');
            newdiv.type = "button";
            newdiv.textContent = table.dataset.name;
            newdiv.onclick = () => open(i);
            newdivs.push(newdiv);
        }
    }
    return newdivs;
}


function interleaveDots(divs) {
    let dots = [];
    var dot;
    for (let i = 1; i < divs.length; i++) {
        dot = document.createElement("div");
        dot.className = "dot";
        dots.push(dot);
    }
    return interleave(divs, dots);
}

const tables = document.getElementById("tablesdiv").getElementsByClassName("tables");
let selected;
let listdiv = document.getElementById("buttonbox");
let buttons = createTableButtons();

Array.from(interleaveDots(buttons)).forEach(element => listdiv.appendChild(element));

function open(sel) {
    if (tables[sel] === selected)
        return;

    var table;
    for (let i = 0; i < tables.length; i++) {
        if (i == sel) {
            table = tables[i];
            table.style.width = "";
            table.style.opacity = "1";
            pulseanimation(table, "flash-inner");

            buttons[i].style.letterSpacing = "2px";
            buttons[i].style.color = "white";
            buttons[i].classList.add("bolder");

            selected = tables[i];
        } else {
            tables[i].style.width = "0px";
            tables[i].style.opacity = "0";
            buttons[i].classList.add("bolder");

            buttons[i].style.letterSpacing = "";
            buttons[i].style.color = "";
            buttons[i].classList.remove("bolder");
        }
    }
}

open(0);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("keydown", (event) => {
        console.log(event);
    })
}

document.addEventListener("keydown", (event) => {
    if (isFinite(event.key) && event.key <= buttons.length) { // is a number
        open(event.key - 1);
    }
})