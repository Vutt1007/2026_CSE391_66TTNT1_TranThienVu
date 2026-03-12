const nameInp = document.getElementById('fullname');
const nameCnt = document.getElementById('name-counter');
const passInp = document.getElementById('pass');
const toggleBtn = document.getElementById('togglePass');
const sBar = document.getElementById('strength-bar');
const sText = document.getElementById('strength-text');

// 1. Dem ky tu ho ten
nameInp.addEventListener('input', () => {
    const len = nameInp.value.length;
    nameCnt.innerText = `${len}/50`;
    if (len >= 50) nameCnt.style.color = 'red';
    else nameCnt.style.color = '#666';
});

// 2. An/hien mat khau
toggleBtn.addEventListener('click', () => {
    const isPass = passInp.type === 'password';
    passInp.type = isPass ? 'text' : 'password';
    toggleBtn.innerText = isPass ? '🔒' : '👁';
});

// 3. Password Strength Bar
passInp.addEventListener('input', () => {
    const val = passInp.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    let color = '';
    let text = '';
    let width = '';

    if (val.length === 0) {
        width = '0%';
    } else if (score <= 2) {
        width = '33%';
        color = 'red';
        text = 'Yeu';
    } else if (score <= 4) {
        width = '66%';
        color = 'orange';
        text = 'Trung binh';
    } else {
        width = '100%';
        color = 'green';
        text = 'Manh';
    }

    sBar.style.width = width;
    sBar.style.backgroundColor = color;
    sText.innerText = text;
    sText.style.color = color;
});

// 4. Validate co ban khi submit
document.getElementById('upgradeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = nameInp.value.trim();
    const passVal = passInp.value;

    let ok = true;
    if (nameVal.length < 3) {
        document.getElementById('err-name').innerText = 'Ten qua ngan';
        ok = false;
    } else {
        document.getElementById('err-name').innerText = '';
    }

    if (passVal.length < 8) {
        document.getElementById('err-pass').innerText = 'Mat khau it nhat 8 ky tu';
        ok = false;
    } else {
        document.getElementById('err-pass').innerText = '';
    }

    if (ok) alert('Cap nhat thanh cong cho: ' + nameVal);
});