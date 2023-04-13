export const formSets = (block) => {
    let temp = '';
    for (const key in block) {
        if (!block[key]) {
            continue;
        }
        temp += `${key} = '${block[key]}'${(key != Object.keys(block)[Object.keys(block).length - 1] ? ", " : "")} `;
    }
    return temp;
};