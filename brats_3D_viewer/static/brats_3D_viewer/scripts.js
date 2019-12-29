let delBtns = document.querySelectorAll('.delete-btn');
delBtns.forEach(btn => btn.addEventListener('click', () => {
    let scanId = btn.dataset.id;
    let deleteURL = RESTfulAPIS['delete'];

    axios.delete(`http://${HOSTNAME}/${deleteURL.split('/')[1]}/${scanId}`)
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        })
        .catch((error) => {
            console.log(error);
        });
}));