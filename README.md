# ТЗ проекта 

# Описание 
Это должна быть игра `камень ножницы бумага` 
в которую можно игра по сети (1 на 1). 
Можно приглашать друзей сыграть с тобой.
Визуал будет простым и минималистичным

# Фичи
- Приглашать на игру (кидаем ссылку и когда человек заходит у нас есть уведомлений что человек зашел и можно сыграть)
- логика игры `камень ножницы бумага`
- разедление на "комнаты" (то есть приватные каналы)
- чат*

# Стек
- nodejs + express + ts
- socket.IO
- фронт без разницы
- БД mongo или postresql или даже redis 
- docker и docker-compose 

Благодарность за фронт вот этому человек (https://github.com/Kushkergast)

# TODO
2) сделать создание комнаты асинхронным + удаление комнат
4) добавить докер для деплоя (настроить все этого гавно)
5) рефактор бекенда (чистим код)
6) рефактор фронта (использовать ejs на максимум чтобы избавиться от дублей кода)