function submitName(){
    //get name value from form
    let name = document.getElementById("name").value;
    //check if the name is in valid format.
    if(!/[a-z]/.test(name) && /[A-Z]/.test(name) && /\s/.test(name)){
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
    //GET request to the url to get the results.
    fetch("https://api.genderize.io/?" + new URLSearchParams({
        name: name
    }))
    //json object.
        .then(response => response.json())
        .then((response) => {
            const {gender, probability} = response;
            if (gender == null) {
                gender_text.innerText = "Name not found!"
                percent_text.innerText = ""
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

//save result in local storage.
function saveResult(){
    let name = document.getElementById("name").value;
    let male = document.getElementById("MaleChoice").checked
    let female = document.getElementById("FemaleChoice").checked
    if(!/[a-z]/.test(name) && /[A-Z]/.test(name) && /\s/.test(name)){
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
//clear the key:value saved in local storage.
function clearSaved(){
    let name = document.getElementById("name").value;
    window.localStorage.removeItem(name);
    document.getElementById("saved_result").innerHTML = "Not saved"
}
