let username = "wilbrown"
let password = "D@rkness1234"
let first_name = "ronan"
let last_name = "teyou"
let email ="teyouronan@gmail.com"
let phone = "696715846"
let birthday = "2002/08/15"
let adress = "odza"

const login = async(username, password) => {
    let data = JSON.stringify({username, password})
    
    const userInfo = await fetch(`http://0.0.0.0:8000/api/auth/sing_in/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    .then(function(response){
        return response.json()
    })
    .catch(error => {console.log(error)})

    let usr = userInfo.profile.user.username;
    let mail = userInfo.profile.user.email;
    let phone = userInfo.profile.phone   ; 
    document.getElementById("name").innerHTML = usr;
    document.getElementById("email").innerHTML = mail;
    document.getElementById("phone").innerHTML = phone;

    const token = "token " + userInfo.Token;
    const userAccountInfo = await fetch(`http://0.0.0.0:8000/api/account/`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization' : token
        }
    })
    .then(function(response){
        return response.json()
    })
    .catch(error => {console.log(error)})

    let userAccount = userAccountInfo[0];
    let me = userAccount.balance;
    document.getElementById("me").innerHTML = me;

    /*
    let amount = 1000;
    let type = "transfert"; //transfer, withdraw
    let number = 697667213;

    let d = {
        "amount":amount,
        "type":type,
        "number":number
    }
    let dat = JSON.stringify(d);

    const transferInfo = await fetch(`http://0.0.0.0:8000/api/transactions/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
        body: dat
    })
    .then(function(response) {
        return response.json();
    })
    .catch(function(error){
        console.log("this is my error " +error);
    })

    console.log(transferInfo);*/

    //document.getElementById("id").innerHTML = met;
    
}

login(username, password);


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

