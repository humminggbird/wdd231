const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const courseCards = document.querySelector("#course-cards");
const creditTotal = document.querySelector("#credit-total");
const filterButtons = document.querySelectorAll(".filter");

function renderCourses(list) {
  courseCards.innerHTML = list
    .map((course) => {
      let checkmark = "";
      if (course.completed) {
        checkmark = "&#10003;";
      } else {
        checkmark = "&#10007;";
      }

      return `
      <div class="course ${course.completed ? "completed" : "incomplete"}"
           aria-label="${course.subject} ${course.number}, ${
        course.completed ? "completed" : "not yet completed"
      }">
        <span class="status" aria-hidden="true">${checkmark}</span>
        <h3 class="course-code">${course.subject} ${course.number}</h3>
        <p class="course-title">${course.title}</p>
        <p class="course-credit">${course.credits} credits</p>
      </div>`;
    })
    .join("");

  const total = list.reduce((sum, course) => sum + course.credits, 0);
  creditTotal.textContent = total;
}

function filterCourses(filter) {
  if (filter === "all") return courses;
  return courses.filter(
    (course) => course.subject.toLowerCase() === filter
  );
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderCourses(filterCourses(button.dataset.filter));
  });
});

renderCourses(courses);
