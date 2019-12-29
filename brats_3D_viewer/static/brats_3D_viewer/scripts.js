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
    })

}



let delBtns = document.querySelectorAll('.delete-btn');
delBtns.forEach(btn => btn.addEventListener('click', () => {
    let scanId = btn.dataset.id;
    let deleteURL = RESTfulAPIS.delete;
    let scansURL = RESTfulAPIS.get_scans;

    axios.delete(`http://${HOSTNAME}/${deleteURL.split('/')[1]}/${scanId}`)
        .then(response => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            
            axios.get(`http://${HOSTNAME}${scansURL}`)
                .then(response => {
                    updateScans(response);
                })
        })
        .catch(error => {
            console.log(error);
        });
}));