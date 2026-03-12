const prices = { "Ao": 150000, "Quan": 250000, "Giay": 500000 };

const form = document.getElementById('orderForm');
const prod = document.getElementById('prod');
const qty = document.getElementById('qty');
const dDate = document.getElementById('dDate');
const addr = document.getElementById('addr');
const note = document.getElementById('note');
const totalDisp = document.getElementById('total-val');
const modal = document.getElementById('confirm-modal');

const showError = (id, msg) => {
    document.getElementById('err-' + id).innerText = msg;
    document.getElementById(id).style.borderColor = msg ? 'red' : '#ccc';
};

// 1. Tinh tong tien tu dong
const calcTotal = () => {
    const p = prices[prod.value] || 0;
    const q = parseInt(qty.value) || 0;
    totalDisp.innerText = (p * q).toLocaleString('vi-VN');
};
prod.addEventListener('change', calcTotal);
qty.addEventListener('input', calcTotal);

// 2. Dem ky tu realtime cho Ghi chu
note.addEventListener('input', () => {
    const len = note.value.length;
    const counter = document.getElementById('char-counter');
    counter.innerText = `${len}/200`;
    if (len > 200) {
        counter.classList.add('over');
        showError('note', 'Ghi chu khong qua 200 ky tu');
    } else {
        counter.classList.remove('over');
        showError('note', '');
    }
});

// 3. Validation
const validate = () => {
    let ok = true;
    if (!prod.value) { showError('prod', 'Vui long chon san pham'); ok = false; } else showError('prod', '');
    
    const qVal = parseInt(qty.value);
    if (isNaN(qVal) || qVal < 1 || qVal > 99) { showError('qty', 'So luong tu 1-99'); ok = false; } else showError('qty', '');

    const today = new Date(); today.setHours(0,0,0,0);
    const selDate = new Date(dDate.value);
    const maxDate = new Date(); maxDate.setDate(today.getDate() + 30);
    if (!dDate.value) { showError('dDate', 'Vui long chon ngay giao'); ok = false; }
    else if (selDate < today) { showError('dDate', 'Khong chon ngay qua khu'); ok = false; }
    else if (selDate > maxDate) { showError('dDate', 'Khong qua 30 ngay tu nay'); ok = false; }
    else showError('dDate', '');

    if (addr.value.trim().length < 10) { showError('addr', 'Dia chi it nhat 10 ky tu'); ok = false; } else showError('addr', '');

    const pay = document.querySelector('input[name="pay"]:checked');
    document.getElementById('err-pay').innerText = pay ? '' : 'Vui long chon PT thanh toan';
    if (!pay) ok = false;

    if (note.value.length > 200) ok = false;

    return ok;
};

// 4. Submit & Xac nhan
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
        const summary = document.getElementById('summary');
        summary.innerHTML = `
            <p><b>SP:</b> ${prod.options[prod.selectedIndex].text}</p>
            <p><b>SL:</b> ${qty.value}</p>
            <p><b>Tong:</b> ${totalDisp.innerText} VND</p>
            <p><b>Ngay giao:</b> ${dDate.value}</p>
        `;
        modal.style.display = 'block';
    }
});

document.getElementById('btn-final-cancel').onclick = () => modal.style.display = 'none';
document.getElementById('btn-final-ok').onclick = () => {
    alert('Dat hang thanh cong! 🎉');
    location.reload();
};

// Clear error khi input
[prod, qty, dDate, addr].forEach(el => {
    el.addEventListener('input', () => showError(el.id, ''));
});