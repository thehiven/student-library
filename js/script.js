/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
Author: Vlad 'hiven' Nadtoka
******************************************/

function createPagination(page, listLength) {
  const div = document.createElement('div');
  div.className = 'pagination';

  const ul = document.createElement('ul');
  div.appendChild(ul);

  fillPagination(listLength, ul);
  page.appendChild(div);

  return ul;
}

function clearPagination(pagination) {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }
}

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

function showSearchResults(list, searchValue, pagination) {
  clearPagination(pagination);

  let foundStudents = [];
  for (let i = 0; i < list.length; i++) {
    let name = list[i].getElementsByTagName('h3')[0].textContent;
    if (name.includes(searchValue)) {
      foundStudents.push(list[i]);
      if (list[i].style.display != 'block') list[i].style.display = 'block';
    } else {
      list[i].style.display = 'none';
    }
  }

  fillPagination(foundStudents.length, pagination);
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('div.page');
  const pageHeader = document.querySelector('div.page-header')
  const students = document.querySelectorAll('li.student-item');
  const pagination = createPagination(page, students.length);
  const search = createSearch(pageHeader);
  const searchInput = search.getElementsByTagName('input')[0];
  const searchButton = search.getElementsByTagName('button')[0];

  let previousActiveLink = pagination.firstChild.firstChild;
  previousActiveLink.className = 'active';
  showPage(students, 1);

  pagination.addEventListener('click', (e) => {
    previousActiveLink.className = '';
    previousActiveLink = e.target;
    e.target.className = 'active';
    showPage(students, parseInt(e.target.textContent));
  });

  searchButton.addEventListener('click', () => {
    showSearchResults(students, searchInput.value, pagination);
  });

  searchInput.addEventListener('keyup', () => {
    showSearchResults(students, searchInput.value, pagination);
  });
});
