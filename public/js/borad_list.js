const button = document.querySelector('.button');

// button.addEventListener('click', () => {
//   const dropdown = document.querySelector('.dropdown');
//   dropdown.style.display = 'block';
// });

// button.addEventListener('blur', () => {
//   const dropdown = document.querySelector('.dropdown');
//   dropdown.style.display = '';
// });

// search_key.addEventListener('click', () => {
//   const dropdown = document.querySelector('.dropdown');
//   dropdown.style.display = 'block';
// });

// search_key.addEventListener('blur', () => {
//   const dropdown = document.querySelector('.dropdown');
//   dropdown.style.display = '';
// });



const articles = document.querySelector("#articles");
// const inConstents = [
//   {
//     date: "날짜1",
//     title: "제목1",
//     content: "내용1",
//     img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f400_300&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220516_140%2F1652709698264mrvXL_JPEG%2F%25C5%25A9%25B1%25E2%25BA%25AF%25C8%25AF%25C6%25C4%25B8%25B6%25BB%25EA%25C4%25A1%25C5%25B2.jpg",
//   },
//   { date: "", title: "", content: "", img: "" },
//   { date: "", title: "", content: "", img: "" },
// ];

// const sql = require("mysql2")
// sql("select * ")

const constents = [
  {
    number: "5",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "6",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "7",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "8",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
];

const another_constents = [
  {
    number: "10",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "20",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "70",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
  {
    number: "80",
    title: "제목1",
    Writer: "내용1",
    dateCreated: "작성일",
    views: "조회수",
  },
];

class BoardManager {

  //class const let 변수 선언
  constructor() {
    this.contents = [];
  }

  setContents = (constents) => {
    this.contents = [...constents];
    console.log();
  };

  getContents = () => this.contents;

  createElement() {
    this.contents.forEach(({ number, title, Writer, dateCreated, views }) => {
      const listTable = document.querySelector(".list-table");

      const newRow = document.createElement("tr");
      newRow.classList.add("divideIn");

      const elnumber = document.createElement("td");
      elnumber.innerHTML = number;

      const eltitle = document.createElement("td"); // <td></td>
      eltitle.innerHTML = title; // <td>`${title}`</td>

      const elWriter = document.createElement("td");
      elWriter.innerHTML = Writer;

      const eldateCreated = document.createElement("td");
      eldateCreated.innerHTML = dateCreated;

      const elviews = document.createElement("td");
      elviews.innerHTML = views;

      //
      newRow.appendChild(elnumber);
      newRow.appendChild(eltitle);
      newRow.appendChild(elWriter);
      newRow.appendChild(eldateCreated);
      newRow.appendChild(elviews);

      // newRow.innerHTML = `
      //         <tr class="divideIn">
      //           <td>${number}</td>
      //           <td>${title}</td>
      //           <td>${Writer}</td>
      //           <td>${dateCreated}</td>
      //           <td>${views}</td>
      //         </tr>
      //         `;

      // articles.appendChild(newRow);

      // listTable.appendChild(newRow);
    });
  }
}

const boardManager = new BoardManager();

boardManager.setContents(another_constents);

boardManager.createElement()

console.log(boardManager.getContents());

// inConstents.forEach(({ date, title, content, img }) => {
//   const newEl2 = document.createElement("div");
//   newEl2.innerHTML = `<div class="section pattern wf-section">
//   <div class="container">
//     <div class="modal-wrapper">
//       <div class="modal-header">
//         <div class="button-circles-wrap">
//           <a href="/" class="button-circle close w-inline-block"></a>
//           <div class="button-circle"></div>
//         </div>
//         <div class="flex-center">
//           <div>${date}</div>
//         </div>
//       </div>
//       <div
//         style="
//           background-image: url((${img});
//         "
//         class="modal-thumbnail large"
//       ></div>
//       <div class="modal-body">
//         <div class="w-embed">
//           <style>
//             p + h2,
//             p + h3,
//             p + h4,
//             p + h5,
//             p + h6 {
//               margin-top: 48px;
//             }
//           </style>
//         </div>
//         <div class="container-width-medium">
//           <h1>${title}</h1>
//           <div class="rich-text-block w-richtext">
//             <p>
//             ${content}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>`;
//   articles.appendChild(newEl);
// });


find_btn.addEventListener("click", () => {

  const searchKey = search_key.value;
  const searchWord = find_input.value;
  const limit = find_btn.dataset.limit;

  const form = document.createElement("form");
  
  form.method = "get";
  form.action = `/tip_board/list/1/${limit}/${searchKey}/${searchWord}`;

  document.body.appendChild(form);

  form.submit();
});