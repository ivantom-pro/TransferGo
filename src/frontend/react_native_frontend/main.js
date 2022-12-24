
let data = JSON.stringify({username:"wilbrown", password:"D@rkness1234"})

fetch("http://127.0.0.1:8000/api/auth/sing_in/", {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: data
})
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data)
    console.log(data.Token)
})
.catch(error => console.log(error))

