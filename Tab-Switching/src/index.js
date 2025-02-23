const tabHeads = document.querySelectorAll('.tab-head');
const tabBodies = document.querySelectorAll('tab-body');

function activeTab(index) {
    tabBodies.forEach((head, i) => {
        head.classList.toggle('active', i === index);
        tabBodies[i].classList.toggle('active', i === index);
    });
}


tabHeads.forEach((head, index) =>{
    head.addEventListener('click', () => activeTab(index))
});

activeTab(0)