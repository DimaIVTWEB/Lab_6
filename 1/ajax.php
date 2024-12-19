<?php
// данные
$data = [
    "А1", "А2", "А3", "А4", "А5",
    "А6", "А7", "А8", "А9", "А10",
];

// Получаем тип запроса
$type = $_POST['type'] ?? null;
$page = isset($_POST['page']) ? (int)$_POST['page'] : 1;
$query = isset($_POST['query']) ? $_POST['query'] : '';

// Обработка запроса в зависимости от типа
if ($type === 'nickname') {
    // Фильтрация данных по запросу
    $filteredData = array_filter($data, function($item) use ($query) {
        return stripos($item, $query) !== false;
    });
    // Пагинация данных
    $offset = ($page - 1) * 10;
    $result = array_slice($filteredData, $offset, 10);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'Invalid type']);
}
?>