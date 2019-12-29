function updateScans(data) {
    let scanList = document.querySelector('div#scan-list ul');
    let oldListItems = document.querySelectorAll('div#scan-list ul li');
    oldListItems.forEach(item => {
        scanList.removeChild(item);
    })
    
    
    let newScans = data.scans;

    newScans.forEach(scan => {
        let newItem = document.createElement('li');
        newItem.innerHTML = `
        <li>${scan[0]}
            <button class="infer-btn" data-case-id="${scan[0]}" data-id="${scan[1]}">Infer</button>
            <button class="view-btn" data-case-id="${scan[0]}" data-id="${scan[1]}">View 3D</button>
            <button class="delete-btn" data-case-id="${scan[0]}" data-id="${scan[1]}">Delete</button>
        </li>
        `;
        scanList.appendChild(newItem);
    })


}

function uploadScan() {
    let formElement = document.querySelector('#upload-form form');
    let formData = new FormData(formElement);

    let uploadURL = RESTfulAPIS.upload;
    console.log(uploadURL);
}

// Upload Scans Asynchronously
document.querySelector('#upload-form button').addEventListener('click', () => {
    uploadScan();
});


// Delete Scans Asynchronously
let delBtns = document.querySelectorAll('.delete-btn');
delBtns.forEach(btn => btn.addEventListener('click', () => {
    let scanId = btn.dataset.id;
    let deleteURL = RESTfulAPIS.delete;
    let scansURL = RESTfulAPIS.get_scans;

    axios.delete(`http://${HOSTNAME}/${deleteURL.split('/')[1]}/${scanId}`)
        .then(response => {
            axios.get(`http://${HOSTNAME}${scansURL}`)
                .then(response => response.data)
                .then(data => {
                    updateScans(data);
                })
        })
        .catch(error => {
            console.log(error);
        });
}));