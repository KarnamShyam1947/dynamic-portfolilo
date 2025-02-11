document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();

    const details = {
        category : document.getElementById("type").value,
        name : document.getElementById("name").value
    }

    fetch("/api/skills/", {
        method:'POST',
        credentials: "include",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(details)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.success) {
            Swal.fire({
                title : "Success",
                text : "Skill added successfully",
                icon : "success"   
            }) 

            document.getElementById("form").reset();
        }
        else {
            Swal.fire({
                title : "Error",
                text : "Error : while adding Skill",
                icon : "error"   
            }) 
        }
    })
    .catch(e => console.log(e));

}