// Cache DOM elements
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const itemList = document.getElementById('item-list');

// Load items from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach(item => addItemToList(item.text, item.checked));
});

// Add item to list
addBtn.addEventListener('click', function() {
  const itemText = itemInput.value.trim();
  if (itemText) {
    addItemToList(itemText, false);
    itemInput.value = '';
    saveItemsToLocalStorage();
  }
});

// Add item to list
function addItemToList(itemText, checked) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = checked;
  checkbox.addEventListener('change', toggleItemState);
  checkbox.setAttribute('aria-label', `Mark ${itemText} as completed`);
  const itemTextElem = document.createElement('span');
  itemTextElem.textContent = itemText;
  itemTextElem.classList.add('item-text');
  if (checked) {
    itemTextElem.classList.add('strike-through');
  }
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.classList.add('remove-btn'); // Add the 'remove-btn' class
  removeBtn.addEventListener('click', removeItem);
  li.appendChild(checkbox);
  li.appendChild(itemTextElem);
  li.appendChild(removeBtn);
  itemList.appendChild(li);
}

// Toggle item state (strike-through)
function toggleItemState() {
  const itemTextElem = this.nextElementSibling;
  itemTextElem.classList.toggle('strike-through');
  saveItemsToLocalStorage();
}

// Remove item from list
function removeItem() {
  const li = this.parentNode;
  li.remove();
  saveItemsToLocalStorage();
}

// Save items to localStorage
function saveItemsToLocalStorage() {
  const items = Array.from(itemList.querySelectorAll('li')).map(li => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const itemText = li.querySelector('.item-text').textContent;
    return { text: itemText, checked: checkbox.checked };
  });
  localStorage.setItem('items', JSON.stringify(items));
}