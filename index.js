const firebaseConfig = {
    apiKey: "AIzaSyAJemYZsgjISzYRq996p1nThgYz1gR-eVM",
    authDomain: "flowing-encoder-394417.firebaseapp.com",
    projectId: "flowing-encoder-394417",
    storageBucket: "flowing-encoder-394417.appspot.com",
    messagingSenderId: "1064433201566",
    appId: "1:1064433201566:web:72670e24b811b9d5af268f"
};  
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getUsers(){

    var index = 0 
    apiCard.innerHTML = " "

    db.collection("users").get().then((querySnapshot) =>{
        querySnapshot.forEach((element) => {
            index += 1
            const data = element.data()
            data.id = element.id
            apiCard.innerHTML += `
                <div class="d-flex justify-content-between">
                    <div>
                        <h6>Usuário ${index}</h6>
                        <ul class="list-unstyled">
                            <li>User: ${data.user}</li>
                            <li>Email: ${data.email}</li>
                        </ul>
                    </div>
                    <button class="btn btn-danger btn-sm h-25" onclick="deleteUser('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            `
        });
    })

}

function addNewUser(event){

    event.preventDefault();

    newUser = {
        user: user.value,
        email: email.value,
        password: senha.value
    }

    db.collection("users").add(newUser)
    .then((response)=>{
        console.log(response)
        getUsers()
    })
    .catch((error)=>{
        console.log(error);
    })

    
    user.value = ""
    email.value = ""
    senha.value = ""

}

function deleteUser(id){

    db.collection("users").doc(id).delete()
    .then(()=>{
        console.log("Documento deletado com sucesso!");
        getUsers()
    })
    .catch((error)=>{
        console.log("Falha ao deletar o arquivo!", error);
    })
    
}

getUsers()
