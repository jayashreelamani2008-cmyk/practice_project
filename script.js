
const students = [
    { id: "CP08-01", name: "Student 1", status: "Pending" },
    { id: "CP08-02", name: "Student 2", status: "Pending" },
    { id: "CP08-03", name: "Student 3", status: "Pending" },
    { id: "CP08-04", name: "Student 4", status: "Pending" },
    { id: "CP08-05", name: "Student 5", status: "Pending" }
];

const studentList = document.getElementById("studentList");

function updateDashboard() {
    document.getElementById("total").textContent = students.length;
    document.getElementById("present").textContent =
        students.filter(s => s.status === "Present").length;
    document.getElementById("absent").textContent =
        students.filter(s => s.status === "Absent").length;
}

function renderStudents(filter = "") {
    studentList.innerHTML = "";

    students
        .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()) ||
                     s.id.toLowerCase().includes(filter.toLowerCase()))
        .forEach(student => {
            const div = document.createElement("div");
            div.className = "student";

            div.innerHTML = `
                <div>
                    <strong>${student.name}</strong><br>
                    <small>${student.id}</small>
                </div>

                <span class="status">${student.status}</span>

                <div>
                    <button class="present-btn">Present</button>
                    <button class="absent-btn">Absent</button>
                </div>
            `;

            div.querySelector(".present-btn").onclick = () => {
                student.status = "Present";
                renderStudents(document.getElementById("search").value);
                updateDashboard();
            };

            div.querySelector(".absent-btn").onclick = () => {
                student.status = "Absent";
                renderStudents(document.getElementById("search").value);
                updateDashboard();
            };

            studentList.appendChild(div);
        });
}

document.getElementById("search").addEventListener("input", event => {
    renderStudents(event.target.value);
});

renderStudents();
updateDashboard();
