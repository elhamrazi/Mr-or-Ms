function submitName(){
    let name = document.getElementById("name").value;
    if(!/^[a-z ]+$/.test(name)){
        window.alert("Wrong input!");
        return;
    }
    let gender_text = document.getElementById("gender_text")
    let percent_text = document.getElementById("percent_text")

    let local_gender = window.localStorage.getItem(name);
    if(local_gender != null){
        document.getElementById("saved_result").innerHTML = local_gender
    }
    else{
        document.getElementById("saved_result").innerHTML = "Not saved"
    }

    // checkStorage(name);
    fetch("https://api.genderize.io/?" + new URLSearchParams({
        name: name
    }))
        .then(response => response.json())
        .then((response) => {
            const {gender, probability} = response;
            if (!gender) {
                gender_text.innerText = "Name not found!"
                gender_text.innerText = ""
            } else {
                gender_text.innerText = gender
                percent_text.innerText = probability
            }
        })
        .catch((error) => {
            gender_text.innerText = "Error!"
            percent_text.innerText = ""
        });
}


function saveResult(){
    let name = document.getElementById("name").value;
    let male = document.getElementById("MaleChoice").checked
    let female = document.getElementById("FemaleChoice").checked
    if(!/^[a-z ]+$/.test(name)){
        window.alert("Wrong input!");
        return;
    }
    if(!female && !male){
        window.alert("Check male or female!");
        return;
    }
    let gen = male?"Male":"Female";
    window.localStorage.setItem(name, gen);
    document.getElementById("saved_result").innerHTML = gen

}

function clearSaved(){
    let name = document.getElementById("name").value;
    window.localStorage.removeItem(name);
    document.getElementById("saved_result").innerHTML = "Not saved"
}
