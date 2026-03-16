let students = JSON.parse(localStorage.getItem('student_list')) || [];
const overlay = document.getElementById('modalOverlay');
const form = document.getElementById('studentForm');

function showAddModal() {
    form.reset();
    document.getElementById('editIndex').value = "";
    clearErrors();
    overlay.style.display = "block";
}

function closeModal() {
    overlay.style.display = "none";
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.innerText = "");
}

form.onsubmit = function(e) {
    e.preventDefault();
    clearErrors();
    
    if (validate()) {
        const student = {
            id: document.getElementById('studentId').value,
            name: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            class: document.getElementById('classRoom').value,
            gpa: parseFloat(document.getElementById('gpa').value).toFixed(2),
            email: document.getElementById('email').value,
            pass: document.getElementById('password').value
        };

        const editIdx = document.getElementById('editIndex').value;
        if (editIdx === "") {
            students.push(student);
        } else {
            students[editIdx] = student;
        }

        localStorage.setItem('student_list', JSON.stringify(students));
        renderTable();
        closeModal();
    }
}

function validate() {
    let isValid = true;
    const sid = document.getElementById('studentId').value;
    const name = document.getElementById('fullName').value;
    const dob = document.getElementById('dob').value;
    const gpa = document.getElementById('gpa').value;
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPass').value;

    if (!/^SV\d{6}$/.test(sid)) {
        document.getElementById('errId').innerText = "Ma SV bat dau SV + 6 chu so";
        isValid = false;
    }

    if (name.trim() === "" || !/^[a-zA-Z\sÀ-ỹ]+$/.test(name)) {
        document.getElementById('errName').innerText = "Ten chi chua chu cai va khoang trang";
        isValid = false;
    }

    if (!dob) {
        document.getElementById('errDob').innerText = "Vui long chon ngay sinh";
        isValid = false;
    } else {
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 18) {
            document.getElementById('errDob').innerText = "Sinh vien phai tu 18 tuoi";
            isValid = false;
        }
    }

    if (gpa === "" || gpa < 0 || gpa > 10) {
        document.getElementById('errGpa').innerText = "Diem tu 0 den 10";
        isValid = false;
    }

    if (!email.endsWith("@student.edu.vn")) {
        document.getElementById('errEmail').innerText = "Email phai ket thuc @student.edu.vn";
        isValid = false;
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passRegex.test(pass)) {
        document.getElementById('errPass').innerText = "MK 8+ ky tu, co hoa, thuong, so, dac biet";
        isValid = false;
    }

    if (confirm !== pass) {
        document.getElementById('errConfirm').innerText = "Xac nhan mat khau khong khop";
        isValid = false;
    }

    return isValid;
}

function renderTable() {
    const tbody = document.getElementById('studentBody');
    tbody.innerHTML = "";
    let totalScore = 0;

    students.forEach((s, index) => {
        totalScore += parseFloat(s.gpa);
        const dateFormatted = s.dob.split('-').reverse().join('/');
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${dateFormatted}</td>
                <td>${s.class}</td>
                <td>${s.gpa}</td>
                <td>
                    <button class="btn-edit" onclick="editStudent(${index})">Sua</button>
                    <button class="btn-delete" onclick="deleteStudent(${index})">Xoa</button>
                </td>
            </tr>
        `;
    });

    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : "0.00";
    document.getElementById('statsBar').innerText = `Tong so sinh vien: ${students.length} | Diem TB lop: ${avg}`;
}

window.deleteStudent = function(idx) {
    if (confirm("Ban co chac chan muon xoa sinh vien nay?")) {
        students.splice(idx, 1);
        localStorage.setItem('student_list', JSON.stringify(students));
        renderTable();
    }
}

window.editStudent = function(idx) {
    const s = students[idx];
    document.getElementById('editIndex').value = idx;
    document.getElementById('studentId').value = s.id;
    document.getElementById('fullName').value = s.name;
    document.getElementById('dob').value = s.dob;
    document.getElementById('classRoom').value = s.class;
    document.getElementById('gpa').value = s.gpa;
    document.getElementById('email').value = s.email;
    document.getElementById('password').value = s.pass;
    document.getElementById('confirmPass').value = s.pass;
    overlay.style.display = "block";
}

renderTable();