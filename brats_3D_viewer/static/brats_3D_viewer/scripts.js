let delBtns = document.querySelectorAll('.delete-btn');
delBtns.forEach(btn => btn.addEventListener('click', () => {
    console.log(`ready to delete ${btn.dataset.id} ${btn.dataset.caseId}`);
}));