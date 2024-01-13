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
    function verticalFour() {
        let count = 1
        let y = line;
        while (y < 5 && document.getElementById(`${y++}:${column}`).value === tour)
        {
            count++;
        }
        return count > 3;
    }

    function horizontalFour() {
        let count = 1;
        let xRight = column, xLeft = column;
        //let xLeft = column;
        while (
            (xRight++ < 6 && document.getElementById(`${line}:${xRight}`).value === tour)
            ||
            (xLeft-- > 0 && document.getElementById(`${line}:${xLeft}`).value === tour)
            )
            count++
        return count > 3;
    }

    function diagoRightFour()
    {
        let count = 1;
        let xRight = column, xLeft = column;
        let yRight = line, yLeft = line;

        while (
            (xRight++ < 6 && yRight-- > 0 && document.getElementById(`${yRight}:${xRight}`).value === tour)
        ||
            (xLeft-- > 0 && yLeft++ < 5 && document.getElementById(`${yLeft}:${xLeft}`).value === tour)
            )
        {
            count++
        }
        return count > 3;
    }

    function diagoLeftFour() {
        let count = 1;
        let xRight = column, xLeft = column;
        let yRight = line, yLeft = line;

        while (
            (xRight++ < 6 && yRight++ < 5 && document.getElementById(`${yRight}:${xRight}`).value === tour)
            ||
            (xLeft-- > 0 && yLeft > 0 && document.getElementById(`${yLeft}:${xLeft}`).value === tour)
            )
        {
            count++
        }
        return count > 3;
    }

    const isWin = verticalFour() || horizontalFour() || diagoRightFour() || diagoLeftFour()
    isWin && alert(tour ? "Joueur 1 " : "Joueur 2")
}

createTable(main)
