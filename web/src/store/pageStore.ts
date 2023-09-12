
import { projectStore } from "./projectStore"

export const pageStore = defineStore('page', () => {

    const userProject = projectStore();

    const thatOption = reactive({
        data: []
    })

    const add = (id) => {

    }

    const get = (id) => {
        
    }

    return {
        add,
        get
    }
})