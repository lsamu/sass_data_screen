

function aaa() {
    const a = undefined

    try {

        const aa = JSON.parse(a)

        const tt = typeof aa;

        console.log(tt)

        if (tt == "object") {
            if (Array.isArray(aa)) {
                console.log("数组")
            } else {
                console.log("对象")
            }
        }

    } catch (error) {
        console.log(error)
    }
}

aaa()