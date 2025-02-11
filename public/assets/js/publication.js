document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();

    const details = {
        title : document.getElementById("title").value,
        duration : document.getElementById("duration").value,
        githubLink : document.getElementById("githubLink").value,
        paperLink : document.getElementById("projectLink").value,
        description : document.getElementById("description").value
    }

    fetch("/api/publications/", {
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
                text : "Publication added successfully",
                icon : "success"   
            }) 

            document.getElementById("form").reset();
        }
        else {
            Swal.fire({
                title : "Error",
                text : "Error : while adding Publication",
                icon : "error"   
            }) 
        }
    })
    .catch(e => console.log(e));

}