export const setAuthToken = (user) => {

    const currentUser = {
        email: user.email
    }

    fetch('https://car-server-tau.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('user-access-token', data.token);
        })
}