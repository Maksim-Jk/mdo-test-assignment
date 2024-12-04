# Заявки (Тестовое задание)

## Описание проекта
SPA-приложение для управления заявками на технические работы управляющей компании, разработанное на Vue.js 2.

## Реализованный функционал

### Авторизация
- Авторизация пользователя через логин/телефон и пароль
- Сохранение токена в localStorage
- Автоматический редирект на страницу логина при отсутствии авторизации
- Выход из системы с очисткой данных авторизации

### Работа с заявками
- Просмотр списка заявок с пагинацией
- Поиск заявок по номеру и названию
- Фильтрация по адресу
- Сортировка по номеру, дате создания и статусу (не функционирует, так как не предоставлен API для сортировки по вложенным полям)
- Создание новых заявок через модальное окно
- Редактирование существующих заявок
- Валидация форм с выводом ошибок

### Дополнительные функции
- Кэширование запросов для оптимизации производительности
- Адаптивный дизайн для мобильных устройств
- Система уведомлений об успехах/ошибках
- Защита роутов от неавторизованного доступа

### Не реализованные функции
- Валидация номера телефона в форме создания заявки

## Технический стек
- Vue.js 2
- Vue Router для маршрутизации
- Vuex для управления состоянием
- Axios для работы с API
- SCSS для стилей
- TypeScript
- Docker для контейнеризации

## Структура проекта
Проект построен с использованием методологии Feature-Sliced Design (FSD):
- `app/` - глобальная конфигурация приложения, стили и провайдеры
- `entities/` - бизнес-сущности (заявки, пользователи)
- `features/` - взаимодействия с пользователем (создание заявки, авторизация)
- `widgets/` - композиционные блоки для страниц
- `shared/` - переиспользуемые модули, UI-компоненты и утилиты
- `pages/` - страницы приложения

## Основные маршруты
- `/auth/login` - страница авторизации
- `/appeals-list` - главная страница со списком заявок

## Деплой
Приложение развернуто по адресу: https://mdo-test-assignment.vercel.app

## Развертывание с помощью Docker

### Предварительные требования
- Установленный Docker
  
### Инструкция по развертыванию
1. Клонируйте репозиторий:
```bash
git clone https://github.com/Maksim-Jk/mdo-test-assignment.git
```
2. Перейдите в директорию проекта:
```bash
cd mdo-test-assignment
```
3. Соберите Docker-образ:
```bash
docker build -t mdo-test-assignment .
```
4. Запустите контейнер:
```bash
docker run -d -p 8080:80 mdo-test-assignment
```
5. Перейдите в браузере по адресу: http://localhost:8080
