export default {
    data:[
        { i: 'b', x: 0, y: 0, w: 3, h: 4, maxH: 6, minH: 4, maxW: 6, minW: 3, obj: 'mass' },
        { i: 'a', x: 5, y: 0, w: 1, h: 2, maxH: 6, minH: 2, maxW: 6, minW: 1, obj: 'but' },
        { i: 'c', x: 5, y: 0, w: 1, h: 2, maxH: 6, minH: 2, maxW: 6, minW: 1 },
        { i: 'd', x: 5, y: 4, w: 1, h: 2, maxH: 6, minH: 2, maxW: 6, minW: 1 },
    ],

    setData: (arr) => {
        this.data = arr
    }
}

