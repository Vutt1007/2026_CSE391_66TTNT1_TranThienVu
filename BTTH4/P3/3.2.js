let cur = 1;
const total = 3;

const showErr = (id, msg) => {
    document.getElementById('err-' + id).innerText = msg;
    document.getElementById(id).style.borderColor = msg ? 'red' : '#ccc';
};

const validateStep = (s) => {
    let ok = true;
    if (s === 1) {
        const n = document.getElementById('name').value.trim();
        const d = document.getElementById('dob').value;
        const g = document.getElementById('gender').value;

        if (n.length < 2) { showErr('name', 'Ten khong hop le'); ok = false; } else showErr('name', '');
        if (!d) { showErr('dob', 'Chon ngay sinh'); ok = false; } else showErr('dob', '');
        if (!g) { showErr('gender', 'Chon gioi tinh'); ok = false; } else showErr('gender', '');
    } 
    else if (s === 2) {
        const m = document.getElementById('mail').value;
        const p = document.getElementById('pass').value;
        const rp = document.getElementById('repass').value;
        const mReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mReg.test(m)) { showErr('mail', 'Email sai dinh dang'); ok = false; } else showErr('mail', '');
        if (p.length < 6) { showErr('pass', 'Mat khau it nhat 6 ky tu'); ok = false; } else showErr('pass', '');
        if (rp !== p || !rp) { showErr('repass', 'Mat khau khong khop'); ok = false; } else showErr('repass', '');
    }
    return ok;
};

const updateUI = () => {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + cur).classList.add('active');
    
    document.getElementById('progress-bar').style.width = (cur / total * 100) + '%';
    document.getElementById('cur-step').innerText = cur;
    
    document.getElementById('btnPrev').style.display = cur === 1 ? 'none' : 'block';
    document.getElementById('btnNext').innerText = cur === total ? 'Hoan tat' : 'Tiep theo';

    if (cur === 3) {
        document.getElementById('review-data').innerHTML = `
            <p><b>Ho ten:</b> ${document.getElementById('name').value}</p>
            <p><b>Ngay sinh:</b> ${document.getElementById('dob').value}</p>
            <p><b>Gioi tinh:</b> ${document.getElementById('gender').value}</p>
            <p><b>Email:</b> ${document.getElementById('mail').value}</p>
        `;
    }
};

document.getElementById('btnNext').onclick = () => {
    if (cur < total) {
        if (validateStep(cur)) {
            cur++;
            updateUI();
        }
    } else {
        alert('Dang ky thanh cong!');
        location.reload();
    }
};

document.getElementById('btnPrev').onclick = () => {
    if (cur > 1) {
        cur--;
        updateUI();
    }
};

document.querySelectorAll('input, select').forEach(el => {
    el.oninput = () => showErr(el.id, '');
});