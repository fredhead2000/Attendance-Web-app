document.addEventListener('DOMContentLoaded', function() {
    // Display current date
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString();

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // If this checkbox is checked, uncheck all others with the same name
            if (this.checked) {
                let studentCheckboxes = document.querySelectorAll(`input[name="${this.name}"]`);
                studentCheckboxes.forEach(box => {
                    if (box !== this) {
                        box.checked = false;
                    }
                });

                let studentName = this.closest('tr').querySelector('td').innerText;
                let date = new Date().toLocaleDateString();
                let key = `attendance_${studentName}_${date}`;
                localStorage.setItem(key, this.value);
            } else {
                // If unchecked, remove from localStorage
                let studentName = this.closest('tr').querySelector('td').innerText;
                let date = new Date().toLocaleDateString();
                let key = `attendance_${studentName}_${date}`;
                localStorage.removeItem(key);
            }
        });
    });
});
// ... (your existing script.js code) ...

function exportToCSV() {
    let rows = document.querySelectorAll('table tbody tr');
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student Name,Status\n"; // Header

    rows.forEach(row => {
        let studentName = row.querySelector('td').innerText;
        let checkboxes = row.querySelectorAll('input[type="checkbox"]');
        let status = "";
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                status = checkbox.value;
            }
        });
        csvContent += `${studentName},${status}\n`;
    });

    // Create a link to download the CSV
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the CSV
}