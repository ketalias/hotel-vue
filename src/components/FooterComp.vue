<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-info">
        <div class="footer-address">
          <h4>Інформація</h4>
          <p>Адреса:</p>
          <p>
            площа Богдана Хмельницького, 2, Ужгород, Закарпатська область, 88000
          </p>
        </div>

        <div class="footer-contacts">
          <h4>Контакти</h4>
          <p>Рецепція:</p>
          <p>+380 312 619 050</p>
          <p>+38 050 377 60 64</p>
          <p>
            Email:
            <a href="mailto:reservation@hoteluzhgorod.com"
              >reservation@hoteluzhgorod.com</a
            >
          </p>
        </div>

        <div class="footer-hours">
          <h4>Години роботи</h4>
          <p>Рецепція працює цілодобово.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 Готель «Ужгород». Всі права захищено.</p>
        <p>Зроблено: Globalistic + ALDESIGN WebStudio</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background-color: #222;
  color: #fff;
  padding: 20px 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-info {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;

    h4 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #1e90ff;
    }

    p {
      margin: 5px 0;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    a {
      color: #1e90ff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    font-size: 0.8rem;
    p {
      margin: 5px 0;
    }
  }
}
</style>
