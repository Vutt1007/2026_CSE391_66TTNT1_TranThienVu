const form = document.getElementById('regForm');
const successDiv = document.getElementById('success-msg');

const showError = (id, msg) => {
    const input = document.getElementById(id);
    const errSpan = document.getElementById('err-' + id);
    if (input && input.type !== 'radio' && input.type !== 'checkbox') input.classList.add('invalid');
    errSpan.innerText = msg;
};

const clearError = (id) => {
    const input = document.getElementById(id);
    const errSpan = document.getElementById('err-' + id);
    if (input && input.type !== 'radio' && input.type !== 'checkbox') {
        input.classList.remove('invalid');
        input.classList.add('valid');
    }
    errSpan.innerText = '';
};

const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (val === '') { showError('fullname', 'Khong duoc de trong'); return false; }
    if (val.length < 3) { showError('fullname', 'Toi thieu 3 ky tu'); return false; }
    if (!regex.test(val)) { showError('fullname', 'Chi chua chu cai'); return false; }
    clearError('fullname'); return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === '') { showError('email', 'Khong duoc de trong'); return false; }
    if (!regex.test(val)) { showError('email', 'Email sai dinh dang'); return false; }
    clearError('email'); return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0[0-9]{9}$/;
    if (val === '') { showError('phone', 'Khong duoc de trong'); return false; }
    if (!regex.test(val)) { showError('phone', 'Phai 10 so, bat dau bang 0'); return false; }
    clearError('phone'); return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (val === '') { showError('password', 'Khong duoc de trong'); return false; }
    if (!regex.test(val)) { showError('password', '8+ ky tu, co hoa, thuong, so'); return false; }
    clearError('password'); return true;
};

const validateConfirm = () => {
    const p1 = document.getElementById('password').value;
    const p2 = document.getElementById('confirm').value;
    if (p2 === '') { showError('confirm', 'Khong duoc de trong'); return false; }
    if (p1 !== p2) { showError('confirm', 'Khong khop mat khau'); return false; }
    clearError('confirm'); return true;
};

const validateGender = () => {
    const checked = document.querySelector('input[name="gender"]:checked');
    if (!checked) { showError('gender', 'Bat buoc chon'); return false; }
    clearError('gender'); return true;
};

const validateTerms = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) { showError('terms', 'Bat buoc tick'); return false; }
    clearError('terms'); return true;
};

// Blur events
document.getElementById('fullname').onblur = validateFullname;
document.getElementById('email').onblur = validateEmail;
document.getElementById('phone').onblur = validatePhone;
document.getElementById('password').onblur = validatePassword;
document.getElementById('confirm').onblur = validateConfirm;

// Input events
['fullname', 'email', 'phone', 'password', 'confirm'].forEach(id => {
    document.getElementById(id).oninput = () => {
        document.getElementById(id).classList.remove('invalid');
        document.getElementById('err-' + id).innerText = '';
    };
});

form.onsubmit = (e) => {
    e.preventDefault();
    
    // Dung toan tu & de tat ca cac ham deu duoc chay
    const isValid = validateFullname() & validateEmail() & validatePhone() & 
                    validatePassword() & validateConfirm() & validateGender() & 
                    validateTerms();

    if (isValid) {
        const name = document.getElementById('fullname').value;
        form.style.display = 'none';
        successDiv.style.display = 'block';
        successDiv.innerText = `Dang ky thanh cong! Chao mung ${name} 🎉`;
    }
};