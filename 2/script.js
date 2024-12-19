document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('newsContainer');
    const pagination = document.getElementById('pagination');
    const searchNews = document.getElementById('searchNews');
    const newsModal = document.getElementById('newsModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close');

    let currentPage = 1;
    const itemsPerPage = 2;
    let allNews = [];

    const fetchNews = (page = 1, query = '') => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'ajax.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let fetchedNews = JSON.parse(xhr.responseText);
                console.log('Fetched news:', fetchedNews); 
                if (page === 1) {
                    allNews = fetchedNews;
                } else {
                    allNews = allNews.concat(fetchedNews);
                }
                console.log('All news:', allNews); 
                displayNews(page);
                displayPagination(page);
            }
        };
        xhr.send(`type=news&page=${page}&query=${query}`);
    };

    const displayNews = (page) => {
        newsContainer.innerHTML = '';
        const newsToDisplay = allNews.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        console.log('News to display:', newsToDisplay); 
        newsToDisplay.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.content.substring(0, 100)}...</p>
                <button class="read-more" data-id="${news.id}">Прочитать</button>
            `;
            newsContainer.appendChild(newsItem);
        });
    };

    const displayPagination = (page) => {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(allNews.length / itemsPerPage);
        console.log('Total pages:', totalPages); // Отладочное сообщение
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => fetchNews(i, searchNews.value));
            pagination.appendChild(pageButton);
        }
    };

    searchNews.addEventListener('input', function() {
        currentPage = 1;
        allNews = []; // Сброс всех новостей при новом поиске
        fetchNews(currentPage, searchNews.value);
    });

    newsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('read-more')) {
            const newsId = event.target.dataset.id;
            const news = allNews.find(news => news.id == newsId);
            modalContent.innerHTML = `
                <h2>${news.title}</h2>
                <p>${news.content}</p>
            `;
            newsModal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', function() {
        newsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === newsModal) {
            newsModal.style.display = 'none';
        }
    });

    fetchNews(currentPage);
});
