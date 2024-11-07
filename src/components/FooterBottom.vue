<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-info">
        <div class="footer-address">
          <h4>{{ $t('footer.information') }}</h4>
          <p>{{ $t('footer.address') }}</p>
          <p>{{ $t('footer.address_detail') }}</p>
        </div>
        <div class="footer-contacts">
          <h4>{{ $t('footer.contacts') }}</h4>
          <p>{{ $t('footer.reception') }}</p>
          <p>{{ $t('footer.phone_1') }}</p>
          <p>{{ $t('footer.phone_2') }}</p>
          <p>
            {{ $t('footer.email') }}
            <a :href="'mailto:' + $t('footer.email_address')">
              {{ $t('footer.email_address') }}
            </a>
          </p>
        </div>
        <div class="footer-hours">
          <h4>{{ $t('footer.working_hours') }}</h4>
          <p>{{ $t('footer.reception_hours') }}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ $t('footer.copyright') }}</p>
        <p>{{ $t('footer.created_by') }}</p>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .footer-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
    h4 {
      font-size: 2rem;
      margin-bottom: 10px;
      color: #ffffff;
    }
    p {
      margin: 5px 0;
      font-size: 1rem;
      line-height: 1.5;
    }
  }
  .footer-bottom {
    justify-self: center;
    text-align: center;
    font-size: 0.8rem;
    p {
      margin: 5px 0;
    }
  }
}
</style>
