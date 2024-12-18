const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item');
const itemList = document.getElementById('item-list');


let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

function renderItems() {
    itemList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item}</span>
            <button onclick="removeItem(${index})">מחק</button>
        `;
        itemList.appendChild(li);
    });

    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem !== '') {
        items.push(newItem);
        itemInput.value = '';
        renderItems();
    }
}

function removeItem(index) {
    items.splice(index, 1);
    renderItems();
}

addItemButton.addEventListener('click', addItem);

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

renderItems();
