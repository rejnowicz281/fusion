const removeDuplicates = (array: any[]) => {
    const arr = array;

    for (let i = 0; i < arr.length; ) {
        const el = arr[i];
        if (i !== arr.lastIndexOf(el)) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }

    return arr;
};

export default removeDuplicates;
