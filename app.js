const projectName = location.pathname.split('/').pop(); // get course project name
const STORAGE_KEY = `htmlacademy-${projectName}-checklist`;

/**
 * Update state in local storage
 *
 * @param {string[]} state
 */
const updateState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Make item as complete
 *
 * @param {HTMLElement} item
 */
const completeItem = (item) => {
  item.style.textDecoration = 'line-through';
  item.classList.add('strikeout');
}

/**
 * Make item as uncomplete
 *
 * @param {HTMLElement} item
 */
const uncompleteItem = (item) => {
  item.style.textDecoration = 'none';
  item.classList.remove('strikeout');
}

/**
 * Create a checkbox element
 *
 * @returns {HTMLInputElement}
 */
const createCheckbox = () => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.marginRight = '5px';

  return checkbox;
}

/**
 * Get Specification Elements
 *
 * @returns {HTMLElement[]}
 */
const getSpecificationItems = () => {
  return [...document.querySelectorAll('#specification li')];
}

/**
 * Append custom checkbox to the specification items
 */
const init = () => {
  const items = getSpecificationItems();

  items.forEach((item) => {
    const checkbox = createCheckbox();
    const itemText = item.innerText;

    const completeList = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (completeList.includes(itemText)) {
      checkbox.checked = true;
      completeItem(item);
    }

    checkbox.addEventListener('click', () => {
      let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

      if (item.classList.contains('strikeout')) {
        uncompleteItem(item);

        state = state.filter((s) => s !== itemText);
        updateState(state);
        return;
      }

      state.push(itemText);
      updateState(state);
      completeItem(item);
    })

    if (item.querySelector('p')) { // if item has paragraph, prepend checkbox into paragraph
      item.querySelector('p').prepend(checkbox);
      return;
    }

    item.prepend(checkbox); // prepend checkbox into li item
  })
}

// init extension
init();
