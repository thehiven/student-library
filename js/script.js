/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.

function createPagination(page, listLength) {
  const div = document.createElement('div');
  div.className = 'pagination';

  const ul = document.createElement('ul');
  div.appendChild(ul);

  const numberOfPages = Math.ceil(listLength / 10);
  for (let i = 0; i < numberOfPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = i + 1;

    li.appendChild(a);
    ul.appendChild(li);
  }
  page.appendChild(div);

  return ul;
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

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('div.page');
  const students = document.querySelectorAll('li.student-item');
  const pagination = createPagination(page, students.length);

  let previousActiveLink = pagination.firstChild.firstChild;
  previousActiveLink.className = 'active';
  showPage(students, 1);

  pagination.addEventListener('click', (e) => {
    previousActiveLink.className = '';
    previousActiveLink = e.target;
    e.target.className = 'active';
    showPage(students, parseInt(e.target.textContent));
  });
});
