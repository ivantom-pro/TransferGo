let username = "wilbrown"
let password = "D@rkness1234"
let first_name = "ronan"
let last_name = "teyou"
let email ="teyouronan@gmail.com"
let phone = "696715846"
let birthday = "2002/08/15"
let adress = "odza"

let data = JSON.stringify({username, password})

fetch("http://0.0.0.0:8000/api/auth/sing_in/", {
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
    var Token = data.Token
    console.log(Token)
    let usr = data.profile.user.username
    let mail = data.profile.user.email
    let phone = data.profile.phone

    document.getElementById("name").innerHTML = usr;
    document.getElementById("email").innerHTML = mail;
    document.getElementById("phone").innerHTML = phone;
    
})
.catch(error => console.log(error))

document.getElementById("name").innerHTML = usr;


/*let user = JSON.stringify({username, first_name, last_name, email, password});
let data = JSON.stringify({user, phone, birthday, adress});

let d = {
    user:user,
    phone:phone
}

let o = {
    "user":{
      "username":username,
      "first_name":first_name,
      "last_name":last_name,
      "email":"teyouronan@gmail.com",
      "password":"terb1234"
    },
    "phone":"696715846",
    "birthday":"22-08-2002",
    "adress":"odza"
  }
  document.getElementById("name").innerHTML = o;
  console.log(o.user.username)
*/

/*fetch(`http://0.0.0.0:8000/api/profile/`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: data
})
.then(function(response) {
    return response.json()
})
.then(function(data){
    console.log(data);
})
.catch(function(error){
    console.log(error);
    alert(data);
})*/

fetch(`http://0.0.0.0:8000/api/profile/`, {
    method: 'GET',
    headers: {
        Token : Token
    }
})
.then(function(response){
    return response.json();
})
.then(function(data){
    let userAccountInfo = data;
    console.log(userAccountInfo);
})
.then(function(error){
    console.log(error);
})
