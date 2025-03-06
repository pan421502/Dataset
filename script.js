// / Sample dataset with 100 items
const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title:`Item ${i + 1}`,
    description: `Description for item ${i + 1} `// Ensuring correct property name
}));

const itemsPerPage = 10;
let currentPage = 1;

function renderTable(filteredData) {
    const tbody = document.getElementById("data-body");
    tbody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredData.slice(start, end).forEach(item => {
        const row = `<tr class='border'>
                        <td class='border p-2'>${item.id}</td>
                        <td class='border p-2'>${item.title}</td>
                        <td class='border p-2'>${item.description}</td>
                     </tr>`;
        tbody.innerHTML += row;
    });
    document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(filteredData.length / itemsPerPage)}`;
}

function updatePagination(filteredData) {
    document.getElementById("first").disabled = currentPage === 1;
    document.getElementById("prev").disabled = currentPage === 1;
    document.getElementById("next").disabled = currentPage * itemsPerPage >= filteredData.length;
    document.getElementById("last").disabled = currentPage * itemsPerPage >= filteredData.length;
}

function handlePagination(event) {
    const action = event.target.id;
    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(document.getElementById("search").value.toLowerCase()) ||
        item.description.toLowerCase().includes(document.getElementById("search").value.toLowerCase())
    );

    if (action === "first") currentPage = 1;
    if (action === "prev" && currentPage > 1) currentPage--;
    if (action === "next" && currentPage * itemsPerPage < filteredData.length) currentPage++;
    if (action === "last") currentPage = Math.ceil(filteredData.length / itemsPerPage);

    renderTable(filteredData);
    updatePagination(filteredData);
}

// Search Functionality
document.getElementById("search").addEventListener("input", () => {
    currentPage = 1;
    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(document.getElementById("search").value.toLowerCase()) ||
        item.description.toLowerCase().includes(document.getElementById("search").value.toLowerCase())
    );
    renderTable(filteredData);
    updatePagination(filteredData);
});

// Pagination Button Listeners
document.getElementById("first").addEventListener("click", handlePagination);
document.getElementById("prev").addEventListener("click", handlePagination);
document.getElementById("next").addEventListener("click", handlePagination);
document.getElementById("last").addEventListener("click", handlePagination);

// Initial render
renderTable(data);
updatePagination(data);