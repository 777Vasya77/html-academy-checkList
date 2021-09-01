const projectName = location.pathname.split('/').pop(); // get course project name
const STORAGE_KEY = `htmlacademy-${projectName}-checklist`;

/**
 * Get and parse state from local storage
 *
 * @returns {array}
 */
const getState = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

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
 * Create Progress Bar Element
 *
 * @param initValue
 * @return {HTMLProgressElement}
 */
const createProgressBar = (initValue = 0) => {
  const progress = document.createElement('progress')
  progress.id = 'progress'
  progress.value = initValue;
  progress.max = 100;
  progress.style.width = '100%';
  progress.style.height = '30px';

  return progress;
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
 * Handle click on checkbox
 *
 * @param {HTMLElement} item
 * @returns {function(): (void)}
 */
const checkboxClickHandler = (item) => {
  return () => {
    const state = getState();
    const itemText = item.innerText;

    if (item.classList.contains('strikeout')) {
      uncompleteItem(item);

      const newState = state.filter((s) => s !== itemText);
      updateState(newState);
      updateProgressBar();
      return;
    }

    state.push(itemText);
    updateState(state);
    updateProgressBar();
    completeItem(item);
  }
}

/**
 * Count Complete Percent
 *
 * @return {string}
 */
const countCompletePercent = () => {
  const items = getSpecificationItems().length;
  const completeList = getState().length;

  return ((completeList / items) * 100).toFixed(2);
};

/**
 * Update Progress Bar
 *
 * @returns {void}
 */
const updateProgressBar = () => {
  const progressBar = document.querySelector('#progress')
  progressBar.value = countCompletePercent();
}

/**
 * Insert Progress Bar
 *
 * @returns {void}
 */
const insertProgressBar = () => {
  const specification = document.querySelector('#specification');
  specification.prepend(createProgressBar(countCompletePercent()));
}

/**
 * Append custom checkbox to the specification items
 *
 * @returns {void}
 */
const init = () => {
  const items = getSpecificationItems();
  const completeList = getState();

  insertProgressBar();

  items.forEach((item) => {
    const checkbox = createCheckbox();
    const itemText = item.innerText;

    if (completeList.includes(itemText)) {
      checkbox.checked = true;
      completeItem(item);
    }

    checkbox.addEventListener('click', checkboxClickHandler(item));

    if (item.querySelector('p')) { // if item has paragraph, prepend checkbox into paragraph
      item.querySelector('p').prepend(checkbox);
      return;
    }

    item.prepend(checkbox); // prepend checkbox into li item
  })
}

// init extension
init();
