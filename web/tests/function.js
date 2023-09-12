const array = [
    {
        "key":"aaa",
        "val":"111"
    },
    {
        "key":"bbb",
        "val":"222"
    },
]

const header = {}

for (const item of array) {
    header[item.key] = item.val;
}

console.log(header)