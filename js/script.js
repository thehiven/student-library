/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author: Vlad 'hiven' Nadtoka
******************************************/

// creates list of links and appends it to the page
function createPagination(page, listLength) {
  const div = document.createElement('div');
  div.className = 'pagination';

  const ul = document.createElement('ul');
  div.appendChild(ul);

  fillPagination(listLength, ul);
  page.appendChild(div);

  return ul;
}

// removes all links in pagination ul
function clearPagination(pagination) {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
}

// fills pagination ul with required number of links
function fillPagination(listLength, pagination) {
  const numberOfPages = Math.ceil(listLength / 10);
  for (let i = 0; i < numberOfPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i + 1;

    li.appendChild(a);
    pagination.appendChild(li);
  }
}

// creates search and appends it to the page header
function createSearch(pageHeader) {
  const div = document.createElement('div');
  div.className = 'student-search';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search for students...';

  const button = document.createElement('button');
  button.textContent = 'Search';

  div.appendChild(input);
  div.appendChild(button);
  pageHeader.appendChild(div);

  return div;
}

// shows correct students depending on page number
function showPage(list, pageNumber) {
  const startIndex = pageNumber * 10 - 10;
  const endIndex = pageNumber * 10 - 1;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }
}

// shows search results based on student name and return new student list
function searchStudents(list, searchValue, pagination) {
  clearPagination(pagination);
  list = document.querySelectorAll('li.student-item'); // reset list
  let foundStudents = [];

  // if search value is empty string go back to showing the entire list
  if (searchValue === '') {
    foundStudents = list;// make sure we go back to displaying whole list of students
    fillPagination(list.length, pagination);
    showPage(list, 1);
  } else {
    // if student name contains searchValue string add it to array
    for (let i = 0; i < list.length; i++) {
      let name = list[i].getElementsByTagName('h3')[0].textContent;
      if (name.includes(searchValue)) {
        foundStudents.push(list[i]);
        if (list[i].style.display != 'block') list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
      }
    }

    if (foundStudents.length > 0) {
      // if there's an error message from previous search remove it
      if (document.getElementById('search-error')) {
        pagination.removeChild(document.getElementById('search-error'));
      }

      // fill pagination based on array of found students and show first search page
      fillPagination(foundStudents.length, pagination);
      showPage(foundStudents, 1);
    } else {
      const error = document.createElement('h1');
      error.id = 'search-error';
      error.textContent = 'No students with provided name have been found!';
      pagination.appendChild(error);
    }
  }

  return foundStudents;
}

// don't do anytrhing untill dom content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('div.page');
  const pageHeader = document.querySelector('div.page-header')
  let students = document.querySelectorAll('li.student-item');
  const pagination = createPagination(page, students.length);
  const search = createSearch(pageHeader);
  const searchInput = search.getElementsByTagName('input')[0];
  const searchButton = search.getElementsByTagName('button')[0];

  // keep track of previously highlighted link in pagination
  let previousActiveLink = pagination.firstChild.firstChild;
  previousActiveLink.className = 'active';
  showPage(students, 1); // show first page on load

  pagination.addEventListener('click', (e) => {
    previousActiveLink.className = ''; // stop highlighting previous link
    previousActiveLink = e.target; // update tracking info
    e.target.className = 'active'; // highlight new link
    showPage(students, parseInt(e.target.textContent));
  });

  searchButton.addEventListener('click', () => {
    students = searchStudents(students, searchInput.value, pagination);
  });

  searchInput.addEventListener('keyup', () => {
    students = searchStudents(students, searchInput.value, pagination);
  });
});
