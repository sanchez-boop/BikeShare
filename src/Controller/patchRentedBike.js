export function patchRentedBike(credentials){
    const curl = 'https://bikengold.herokuapp.com/bikes';
    const options = {
        method : 'PATCH',
        headers : {
            'Content-Type': 'application/json;charset=utf-8',
            },
        body : JSON.stringify(credentials)
    };

    return fetch(curl,options)
    .then(response=>{return response.json()})
    .catch(error=>{alert(error)});
}