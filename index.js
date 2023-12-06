const firebaseConfig = {
  apiKey: "AIzaSyAJemYZsgjISzYRq996p1nThgYz1gR-eVM",
  authDomain: "flowing-encoder-394417.firebaseapp.com",
  projectId: "flowing-encoder-394417",
  storageBucket: "flowing-encoder-394417.appspot.com",
  messagingSenderId: "1064433201566",
  appId: "1:1064433201566:web:72670e24b811b9d5af268f",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getUsers() {
  var index = 0;
  apiCard.innerHTML = " ";

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        index += 1;
        const data = element.data();
        if (data != null) {
          data.id = element.id;
          apiCard.innerHTML += `
                    <div class="d-flex justify-content-between">
                        <div>
                            <h6>Usuário ${index}</h6>
                            <ul class="list-unstyled">
                                <li>User: ${data.user}</li>
                                <li>Email: ${data.email}</li>
                            </ul>
                        </div>
                        <button class="btn btn-danger btn-sm h-25" onclick="deleteUser('${data.id}', '${data.password}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
        }
      });
    });
}

function addNewUser(event) {
  event.preventDefault();

  newUser = {
    user: document.getElementById('user').value,
    email: document.getElementById('email').value,
    password: document.getElementById('senha').value
  };

  db.collection("users")
    .add(newUser)
    .then((response) => {
      console.log(response);
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });

    document.getElementById('user').value = ""
    document.getElementById('email').value = ""
    document.getElementById('senha').value = ""
}

function deleteUser(id, password) {
  senha = prompt("Digite a senha da conta para excluí-la");

  if (senha == password) {
    db.collection("users")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Documento deletado com sucesso!");
        getUsers();
      })
      .catch((error) => {
        console.log("Falha ao deletar o arquivo!", error);
      });
  } else {
    alert("Senha incorreta");
  }
}

getUsers();
