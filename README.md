# blog

## Стек технологій

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![ReactHookForm](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Saga](https://img.shields.io/badge/Redux%20saga-86D46B?style=for-the-badge&logo=redux%20saga&logoColor=999999)

## Опис проекту

`"Блог"` - spa-додаток для створення та перегляду ваших постів.

`Основні функції:`

1. Список постів: Відображає список блог-постів з їхньою основною інформацією.

2. Детальний пост: Дозволяє користувачу переглядати повний текст та основну інформацію до
   обраного блог-посту.

3. Форма створення поста: Реалізована форма з використанням Zod для валідації введених
   користувачем даних.

4. Видалення та редагування посту: Легко редагуйте або видаляйте створені пости.

5. База даних: Firestore DB.

`Посилання на сайт:` https://blog-taupe-two-16.vercel.app/

## Встановлення

```
git clone https://github.com/Dmytro1117/blog.git
npm install
npm start
```

### Використовуйте власні облікові дані Firebase

- відвідайте https://firebase.google.com/ і створіть власний проєкт
- скопіюйте ваш firebaseConfig і замініть існуючі налаштування, що знаходяться
  src/api/firebase.ts
