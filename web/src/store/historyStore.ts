import { defineStore } from 'pinia'

export const historyStore = defineStore('history', () => {

    const thatOption = reactive({
        history: [],
        maxLength: 50,
        index: -1
    })

    // 撤销
    const getPrev = () => {
        let prev = thatOption.index - 1;
        let prevData = thatOption.history[prev];
        if (prevData) {
            thatOption.index = prev;
            try {
                prevData = JSON.parse(prevData)
            } catch (e) {
                prevData = null;
            }
        }
        return prevData;
    }

    // 恢复
    const getNext = () => {
        let next = thatOption.index + 1
        let nextData = thatOption.history[next]
        if (nextData) {
            thatOption.index = next
            try {
                nextData = JSON.parse(nextData)
            } catch (e) {
                nextData = null
            }
        }
        return nextData
    }

    // change
    const change = (data) => {
        if (!data) return
        let index = thatOption.index
        let startIndex = 0
        let length = thatOption.history.length
        if (!(index == length - 1 && length < thatOption.maxLength)) {
            startIndex = Math.max(index + 2 - thatOption.maxLength, 0)
            thatOption.history = thatOption.history.slice(startIndex, index + 1)
        }
        thatOption.history.push(JSON.stringify(data))
        thatOption.index = thatOption.history.length - 1
    }

    return {
        getPrev,
        getNext,
        change,
        thatOption
    }
}, { persist: true })