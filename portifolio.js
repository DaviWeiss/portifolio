const urlProfile = "https://api.github.com/users/DaviWeiss"
const urlRepos = "https://api.github.com/users/DaviWeiss/repos"

function getUser() {
    axios.get(urlProfile).then((res) => {
        const data = res.data
        console.log(data)
        fillHeaderProfile(data)
        fillLinks(data)
    })
}

function fillHeaderProfile(data) {
    const img = document.getElementById('img-profile');
    const name = document.getElementsByClassName("name");
    img.src = data.avatar_url;
    name[0].innerText = data.name;
}

function fillLinks(data) {
    const location = document.getElementsByClassName("location");
    const company = document.getElementsByClassName("company");
    const userName = document.getElementsByClassName("userName");
    const linkedin = document.getElementsByClassName("linkedin");
    location[0].innerText = data.location;
    company[0].innerText = data.company;
    userName[0].innerText = data.login;
    linkedin[0].innerText = data.blog;
}

function getLastRepos() {
    axios.get(urlRepos).then((res) => {
        const data = res.data
        fillInfosProjects(data)
    })
}

function fillInfosProjects(data) {
    const linkP1 = document.getElementById("p1");
    const linkP2 = document.getElementById("p2");
    const titleP1 = document.getElementById("title-p1");
    const titleP2 = document.getElementById("title-p2");
    const descriptionP1 = document.getElementById("description-p1");
    const descriptionP2 = document.getElementById("description-p2");
    const updatedP1 = document.getElementById("updated-p1");
    const updatedP2 = document.getElementById("updated-p2");

    linkP1.href = data[0].clone_url
    linkP2.href = data[1].clone_url

    titleP1.innerText = data[0].name
    titleP2.innerText = data[1].name

    data[0].description ? descriptionP1.innerText = data[0].description : descriptionP1.innerText = "Não existe descrição para esse projeto"
    data[1].description ? descriptionP2.innerText = data[1].description : descriptionP2.innerText = "Não existe descrição para esse projeto"

    const dataP1 = new Date(data[0].updated_at);
    const dataP2 = new Date(data[1].updated_at);

    const data_formatada_p1 = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(dataP1);
    const data_formatada_p2 = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }).format(dataP2);

    updatedP1.innerText = data_formatada_p1;
    updatedP2.innerText = data_formatada_p2;
}

getUser()
getLastRepos()