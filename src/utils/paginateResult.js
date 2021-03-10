const paginateResult = args => {
    const {
        after: cursor,  
        batchSize = 10, 
        results, 
        getCursor = item => results.indexOf(item),
    } = args; 
    if(batchSize < 1) return []; 
    if(!cursor) return results.slice(0, batchSize); 
    const cursorIndex = results.findIndex(item => {
        let itemCursor = item.cursor ? item.cursor : getCursor(item);
        return itemCursor ? cursor === itemCursor : false; 
    }); 
    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 
            ? []
            : results.slice(cursorIndex+1, Math.min(results.length, cursorIndex+1+batchSize))
        : results.slice(0, batchSize);
}

module.exports = paginateResult;