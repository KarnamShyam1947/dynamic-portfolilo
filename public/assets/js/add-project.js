
$('#inputBox').tagator();
var data = {};
const form = document.getElementById("form");
const mainImage = document.getElementById("mainImage");
const submitBtn = document.getElementById("submitBtn");
const loadingBtn = document.getElementById("loadingBtn");
const projectImages = document.getElementById("projectImages");

let cnt = 0;
loadingBtn.style.display = "none";

let inputContainer = `
<div class="row  mb-1">
    <div class="col-lg-6">
        <input name="subTitle" placeholder="Enter title of image.." type="text" class="form-control">
    </div>
    
    <div class="col-lg-5">
        <input name="images" type="file" class="form-control">
    </div>

    <div class="col-lg-1">
        <button onclick="removeContainer(this)" style="width: 100%;" type="button" class="btn btn-danger">
            remove item
        </button>
    </div>
</div>
`;

const addContainer = () => {
    cnt++;
    projectImages.insertAdjacentHTML("afterbegin", inputContainer);
}

const removeContainer = (ele) => {
    //swal({
    //    title: "Are you sure?",
    //    text: "You will not be able to recover this imaginary file!",
    //    icon: "warning",
    //    buttons: [
    //        'No, cancel it!',
    //        'Yes, I am sure!'
    //    ],
    //    dangerMode: true,
    //}).then(function (isConfirm) {
    //    if (isConfirm) {
            ele.parentNode.parentNode.remove();
            cnt--;
    //    }
    //})
}

form.onsubmit = async (e) => {

    e.preventDefault();

    if (cnt <= 0) {
        //swal("error", "Add at least one item to invoice..", "error");
        alert("Add at least one item to invoice..");
    }
    else {
        console.log("Started.........");

        loadingBtn.style.display = "block";
        submitBtn.style.display = "none";

        const single = await uploadSingleImage();
        const multiple = await uploadMultipleImages();

        const inputs = document.querySelectorAll('input[name="subTitle"]');
        const values = Array.from(inputs).map(input => input.value);
        console.log(values);

        tempData = {
            "projectName" : document.getElementById("projectName").value,
            "projectLink" : document.getElementById("projectLink").value,
            "projectFiled" : document.getElementById("projectFiled").value,
            "cssClasses" : document.getElementById("cssClasses").value,
            "description" : document.getElementById("description").value,
            "skills" : document.getElementById("skills").value,
            "subTitles" : values,
        }

        data = {...data, ...tempData}

        await fetch('/api/projects/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type' : "application/json"
            }),
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(d => {
            console.log(d);
            alert("added successfully");

            form.reset();

            loadingBtn.style.display = "none";
            submitBtn.style.display = "block";
        })
        .catch((error) => {
            console.error(error);
        });
        
        console.log("Completed.........");
    }
}

const uploadSingleImage = async () => {
    const mainImage = document.getElementById("mainImage");
        
    const mainImageFormData = new FormData(); 
    mainImageFormData.append("mainImage", mainImage.files[0])

    await fetch('/api/uploads/upload-single', {
        method: 'POST',
        body: mainImageFormData,
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        data = {...data, ...d};
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
}

const uploadMultipleImages = async () => {
    const imageInputs = document.querySelectorAll('input[name="images"]');

    const formData = new FormData();

    imageInputs.forEach(input => {
        Array.from(input.files).forEach(file => {
            formData.append("images", file);  
        });
    });

    await fetch('/api/uploads/upload-multiple', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        data={...data, ...d};
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });

}

