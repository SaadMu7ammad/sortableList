const draggable_list = document.querySelector('.draggable-list');
const check = document.querySelector('.check-btn');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  richestPeople
    .map((a) => ({ name: a, moneyRnd: Math.random() }))
    .sort((a, b) => a.moneyRnd - b.moneyRnd) //sort according to moneyRnd value
    .map((a) => a.name)
    .forEach((person, index) => {
      // console.log(person, index);
      const listItem = document.createElement('li');
      // listItem.classList.add('over');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  dragEndIndex = +this.closest('li').getAttribute('data-index');
  swapItem(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
  // checkOrder()
}
function swapItem(start, end) {
  // console.log(start,end);
  const itemOne = listItems[start].querySelector('.draggable');
  const itemTwo = listItems[end].querySelector('.draggable');
  // appendChild method moves the elements rather than copying them, the result is a swap of the two elements in the DOM tree.
  listItems[start].appendChild(itemTwo);
  listItems[end].appendChild(itemOne);
  // console.log(listItems);
}
function addEventListeners() {
  const draggableItems = document.querySelectorAll('.draggable-list li');
  const draggable = document.querySelectorAll('.draggable');
  // console.log(draggable,draggableItems);
  draggable.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableItems.forEach((it) => {
    it.addEventListener('dragover', dragOver);
    it.addEventListener('drop', dragDrop);
    it.addEventListener('dragenter', dragEnter);
    it.addEventListener('dragleave', dragLeave);
  });
}

function checkOrder() {
  // console.log(listItems);
  listItems.forEach((listItem, indx) => {
    if (
      listItem.querySelector('.person-name').textContent === richestPeople[indx]
    ) {
      listItem.className = 'li true';
    } else {
      listItem.className = 'li false';
    }
  });
}
check.addEventListener('click', checkOrder);
