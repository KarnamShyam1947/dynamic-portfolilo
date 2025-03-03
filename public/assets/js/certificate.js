document.getElementById("form").onsubmit = (e) => {
    e.preventDefault();

    const details = {
        title : document.getElementById("name").value,
        issuer : document.getElementById("issuer").value,
        certificateLink : document.getElementById("link").value,
        duration : document.getElementById("duration").value,
        skills : document.getElementById("skills").value
    }

    fetch("/api/certificates/", {
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
                text : "certificate added successfully",
                icon : "success"   
            }) 

            document.getElementById("form").reset();
        }
        else {
            Swal.fire({
                title : "Error",
                text : "Error : while adding certificate",
                icon : "error"   
            }) 
        }
    })
    .catch(e => console.log(e));

}