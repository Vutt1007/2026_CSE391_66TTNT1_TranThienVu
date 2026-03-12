let data = [];
const nInp = document.getElementById('name');
const sInp = document.getElementById('score');

const getLvl = (s) => {
    if (s >= 8.5) return "Gioi";
    if (s >= 7.0) return "Kha";
    if (s >= 5.0) return "Trung binh";
    return "Yeu";
};

const render = () => {
    const body = document.getElementById('list');
    body.innerHTML = "";
    let sum = 0;

    data.forEach((item, i) => {
        const tr = document.createElement('tr');
        if (item.s < 5) tr.className = 'low';
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.n}</td>
            <td>${item.s}</td>
            <td>${item.l}</td>
            <td><button onclick="del(${i})">Xoa</button></td>
        `;
        body.appendChild(tr);
        sum += item.s;
    });

    const avg = data.length ? (sum / data.length).toFixed(2) : 0;
    document.getElementById('result').innerText = `Tong: ${data.length} | TB: ${avg}`;
};

document.getElementById('add').onclick = () => {
    const n = nInp.value.trim();
    const s = parseFloat(sInp.value);
    if (!n || isNaN(s) || s < 0 || s > 10) {
        alert("Kiem tra lai du lieu");
        return;
    }
    data.push({ n, s, l: getLvl(s) });
    nInp.value = ""; sInp.value = ""; nInp.focus();
    render();
};

sInp.onkeyup = (e) => { if (e.key === "Enter") document.getElementById('add').click(); };

window.del = (i) => {
    data.splice(i, 1);
    render();
};