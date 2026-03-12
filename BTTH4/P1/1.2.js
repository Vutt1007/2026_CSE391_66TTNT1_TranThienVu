let students = [
    { name: "Nguyen Van A", score: 9.5, grade: "Gioi" },
    { name: "Tran Thi B", score: 4.0, grade: "Yeu" },
    { name: "Le Van C", score: 7.2, grade: "Kha" },
    { name: "Hoang Van D", score: 6.5, grade: "Trung binh" },
    { name: "Vu Thien An", score: 8.8, grade: "Gioi" }
];

let isAsc = true;

const renderTable = () => {
    const searchKey = document.getElementById('searchInp').value.toLowerCase();
    const gradeKey = document.getElementById('filterGrade').value;
    const tbody = document.getElementById('tableBody');

    const filteredData = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(searchKey);
        const matchGrade = (gradeKey === 'all') || (s.grade === gradeKey);
        return matchName && matchGrade;
    });

    tbody.innerHTML = '';

    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Khong co ket qua phu hop</td></tr>';
        return;
    }

    filteredData.forEach((s, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.score}</td>
            <td>${s.grade}</td>
        `;
        tbody.appendChild(row);
    });
};

document.getElementById('searchInp').addEventListener('input', renderTable);
document.getElementById('filterGrade').addEventListener('change', renderTable);

document.getElementById('btnSort').addEventListener('click', () => {
    isAsc = !isAsc;
    students.sort((a, b) => isAsc ? a.score - b.score : b.score - a.score);
    document.getElementById('sortIcon').innerText = isAsc ? "▲" : "▼";
    renderTable();
});

renderTable();