url = "https://toy-store-json.vercel.app/users/"

function getUsers(){

    apiCard.innerHTML = " "

    axios.get(url)
    .then(response =>{
        const data = response.data
        data.map((user, index)=>{
            apiCard.innerHTML += `
                <div class="d-flex justify-content-between">
                    <div>
                        <h6>Usuário ${index + 1}</h6>
                        <ul class="list-unstyled">
                            <li>User: ${user.user}</li>
                            <li>Email: ${user.email}</li>
                        </ul>
                    </div>
                    <button class="btn btn-danger btn-sm h-25" onclick="deleteUser(${user.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `
        })
    })
    .catch(error => {
        console.log(error);
    })

}
getUsers()

function addNewUser(event){

    event.preventDefault();

    newUser = {
        user: user.value,
        email: email.value,
        password: senha.value
    }

    axios.post(url, newUser)
    .then(response=>{
        console.log(response);
        getUsers()
    })
    .catch(error=>{
        console.log(error);
        getUsers()
    })

    
    user.value = ""
    email.value = ""
    senha.value = ""

}

function deleteUser(id) {
    axios.delete(url+id)
    .then(response=>{
        console.log(response);
        getUsers()
    })
    .catch(error=>{
        console.log(error);
        getUsers()
    })
}