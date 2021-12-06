export function getBlacklisted(){
    const curl = 'https://bikengold.herokuapp.com/users/blacklisted';

    /*By returning fetch, you return a promise that, when
    fulfilled, returns the user information*/
    return fetch(curl)
    .then(response=>{return response.json()})
    .catch(error=>{alert(error)});
}