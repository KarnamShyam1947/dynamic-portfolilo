document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();

    const details = {
        course : document.getElementById("course").value,
        duration : document.getElementById("duration").value,
        institute : document.getElementById("institute").value,
        description : document.getElementById("description").value
    }

    fetch("/api/education/", {
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
                text : "Eduction added successfully",
                icon : "success"   
            }) 

            document.getElementById("form").reset();
        }
        else {
            Swal.fire({
                title : "Error",
                text : "Error : while adding Eduction",
                icon : "error"   
            }) 
        }
    })
    .catch(e => console.log(e));

}