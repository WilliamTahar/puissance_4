const main = document.getElementById('main')
let tour = true
function createTable(target)
{
    const table = document.createElement('table');
    for (let y = 0; y < 6; y++) {
        const tr = document.createElement('tr')
        for (let x = 0; x < 7; x++) {
            const td = document.createElement('td')
            td.value = 0
            td.id = y + ':' + x
            td.addEventListener('click', putCoin)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
    target.appendChild(table);
}

function putCoin(event) {
    const td = event.target
    const column = td.id.charAt(2)
    let line = 5
    let jeton = null
    while (line >= 0 &&
    (jeton = document.getElementById(line + ':' + column)).value !== 0) {
        line -= 1;
    }
    jeton.value = tour
    const coin = document.createElement('div')
    jeton.appendChild(coin)
    coin.classList.add('coin', tour ? 'red' : 'yellow')
    gameOver(line, column)
    // Inversion de boolean
    tour = !tour
}

function gameOver(line, column) {
    console.log(`${line}:${column}`)
    console.log(document.getElementById(`${line}:${column}`).value, 'VALUE')
    function verticalFour() {
        let count = 0
        let y = line;
        while (y > 1 && y <= 5 && document.getElementById(`${y++}:${column}`).value === tour) {
            count++;
        }
        return count >= 4;
    }

    function horizontalFour() {
        return false;
    }

    function diagoRightFour() {
        return false;
    }

    function diagoLeftFour() {
        return false;
    }

    const isWin = verticalFour() || horizontalFour() || diagoRightFour() || diagoLeftFour()
    isWin && alert(tour ? "Joueur 1 " : "Joueur 2")
}

createTable(main)
