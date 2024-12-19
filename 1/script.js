document.addEventListener('DOMContentLoaded', function() {
            const searchQuery = document.getElementById('searchQuery');
            const searchButton = document.getElementById('searchButton');
            const results = document.getElementById('results');

            let currentPage = 1;
            const itemsPerPage = 10;

            const fetchData = (page = 1) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'ajax.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        displayResults(data, page);
                    }
                };
                xhr.send(`type=nickname&page=${page}&query=${searchQuery.value}`);
            };

            const displayResults = (data, page) => {
                if (page === 1) {
                    results.innerHTML = '';
                }
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item;
                    results.appendChild(div);
                });
            };

            searchButton.addEventListener('click', () => {
                currentPage = 1;
                fetchData(currentPage);
            });

        });