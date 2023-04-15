export const formSets = (block) => {
  let temp = '';
  const cleanObject = (block) => {
    for (const key in block) {
      if (!block[key]) {
        delete block[key];
      }
    }
    return block;
  }
  block = cleanObject(block);
  for (const key in block) {
    temp += `${key} = ${(block[key] != "NULL" ? `'${block[key]}'` : 'NULL')}${(key != Object.keys(block)[Object.keys(block).length - 1] ? ", " : "")} `;
  }
  return temp;
};