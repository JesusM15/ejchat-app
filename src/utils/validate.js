export const emptyFields = (item) => {
    let result = {
        valid: true,
        emptyFields: [],
    }

    for(let key in item){
        let field = item[key];
        if(field.trim() === '' || field === '' || field === undefined || field === null || !field){
            result = {
                ...result,
                valid: false,
                emptyFields: [ ...result.emptyFields, key],
            }
        }
    }

    return result;
}