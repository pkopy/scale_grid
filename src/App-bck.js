const [modules, setModules] = React.useState([
    { h: 1, w: 1 }
])

const [widg, setWidg] = React.useState([

])
const [t, setT] = React.useState(0)
const [grid, setGrid] = React.useState(new Array(18).fill(0))
const add = () => {
    let arr = modules.slice()
    arr.push({ h: 1, w: 1 })
    setModules(arr)
}

const widget = (h = 1, w = 1) => {
    const body = document.querySelector('.App')
    const helpArr = grid.slice()
    // console.log(helpArr)
    let arr = []
    let widgArr = widg.slice()
    let free = 0

    for (let elem of widgArr) {
        free += elem.h * elem.w
    }
    console.log('free: ', 18 - free)
    if (w === 6) {
        // helpArr[2].c = 3
    }
    const div = document.createElement('div')
    div.style.height = 170 * (h) + "px"
    div.style.width = 170 * (w) + "px"
    div.style.border = '2px solid'

    for (let i = 0; i < grid.length; i++) {
        if (!grid[i]) {

            if (t > 11) {
                div.style.top = '340px'
                div.style.left = 170 * (i - 12) + "px"
            } else if (t > 5) {
                div.style.top = '170px'
                div.style.left = 170 * (i - 6) + "px"
            } else {
                div.style.left = 170 * (i) + "px"
                div.style.top = 0
            }
            setT(i + w)

            console.log(t)
            break
        }

    }
    div.style.position = 'absolute'
    div.style.backgroundColor = 'gray'

    // widgArr.push({ h, w, p:0, t:0, l: helpArr[0]})
    // setWidg(widgArr)
    // const helpArr = checkEmptyFields(x, h, w)
    console.log('t ', t)
    for (let i = 0; i < h; i++) {
        for (let j = t; j < w + t; j++) {
            let fieldPos = j + (i * 6)
            console.log('gridField ', fieldPos)
            if (!helpArr[fieldPos]) {
                console.log('x')
                helpArr[fieldPos] = 1
            } else {
                // break
            }
        }
    }

    body.appendChild(div)
    setGrid(helpArr)
    console.log('grid:', grid)
}
const checkEmptyFields = (arr, h, w, t, l) => {
    const helpArr = arr.slice()
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            let fieldPos = j + (i * 6)
            console.log('gridField ', fieldPos)
            if (!helpArr[fieldPos]) {
                console.log('x')
                helpArr[fieldPos] = 1
            } else {
                // break
            }

        }

    }
    return helpArr, true
}
const _grid = (h, w) => {
    // return (
    //     <div >
    //         {modules.map(elem =>
    //             <div style={{
    //                 border: "1px solid rgb(0,0,0,0.2)",
    //                 // margin: '1px',
    //                 height: elem.h * 170 + 'px',
    //                 width: elem.w * 170 + 'px',
    //                 // resize: 'both',
    //                 // overflow: 'auto'
    //             }}></div>

    //         )}

    //     </div>
    // )
    const body = document.querySelector('#test_grid')
    const div = document.createElement('div')
    const helpArr = grid.slice()
    // div.style.height= 170 * (h)+ "px"
    // div.style.width= 170 * (w) + "px"
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i]) {

            if (i >= 12 && 18 - i >= w) {
                div.style.gridArea = `3/${i - 11}/${h + 2}/${i - 11 + w}`

            } else if (i >= 6 && 12 - i >= w) {
                div.style.gridArea = `2/${i - 5}/${h + 1}/${i - 5 + w}`
            } else if (6 - i >= w) {
                div.style.gridArea = `1/${i + 1}/${h + 1}/${i + w + 1}`
            } else {
                div.style.gridArea = `1/${i + 1}/${h + 1}/${i + 2}`
                w = 1
            }
            for (let k = 0; k < h; k++) {
                for (let j = i; j < w + i; j++) {
                    let fieldPos = j + (k * 6)
                    console.log('gridField ', fieldPos)
                    if (!helpArr[fieldPos]) {
                        console.log('x')
                        helpArr[fieldPos] = 1
                    } else {
                        // break
                    }
                }
            }
            break
        }

    }



    setGrid(helpArr)
    console.log(grid)
    div.style.border = '1px solid'
    div.style.backgroundColor = 'gray'
    body.appendChild(div)
}