
let data = JSON.stringify({username:"wilbrown", password:"D@rkness1234"})

fetch("http://172.20.10.4:8000/api/auth/sing_in/", {
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
    let usr = data.profile.user.username
    let mail = data.profile.user.email
    let phone = data.profile.phone

    document.getElementById("name").innerHTML = usr;
    document.getElementById("email").innerHTML = mail;
    document.getElementById("phone").innerHTML = phone;
    
})
.catch(error => console.log(error))

document.getElementById("name").innerHTML = usr;

