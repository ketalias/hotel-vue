<template>
  <nav class="navbar">
    <div class="logo">
      <img :src="logo" alt="Kilikia Logo" />
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="/">{{ $t('navbar.home') }}</router-link>
      </li>
      <li>
        <router-link to="/catalog">{{ $t('navbar.catalog') }}</router-link>
      </li>
      <li>
        <router-link to="/contact">{{ $t('navbar.contact') }}</router-link>
      </li>
      <li>
        <a> <button @click="changeLanguage('ua')">UA</button></a
        ><span class="stick">|</span
        ><a> <button @click="changeLanguage('en')">EN</button></a>
      </li>
      <li>
        <router-link to="/authorize"
          ><font-awesome-icon icon="fa-solid fa-user"
        /></router-link>
      </li>
      <li>
        <router-link to="/userbusket"
          ><font-awesome-icon icon="fa-solid fa-bucket"
        /></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      logo: require('@/assets/logo.png'),
    };
  },
  created() {
    this.$i18n.locale = localStorage.getItem('lastLanguage') || 'en';
    if (localStorage.getItem('lastLanguage') !== this.$i18n.locale) {
      localStorage.setItem('lastLanguage', this.$i18n.locale);
    }
    const self = this;
    window.addEventListener('storage', function () {
      if (self.$i18n.locale !== localStorage.getItem('lastLanguage')) {
        self.$i18n.locale = localStorage.getItem('lastLanguage');
        self.$router.go();
      }
    });
  },

  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lastLanguage', this.$i18n.locale);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 10px;
  background-color: #131313;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: background-color 0.3s ease;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    margin-left: 5px;
    font-size: 1.8rem;
    font-weight: 600;
    color: #f5f5f5;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
  }

  img {
    width: 40px;
    height: 40px;
  }
}

.nav-links {
  display: flex;
  list-style: none;

  li {
    margin: 0 10px;

    a {
      padding: 10px 10px;
      font-size: 1.1rem;
      font-weight: 500;
      color: #f0f0f0;
      text-decoration: none;
      font-family: 'Poppins', sans-serif;
      border-radius: 5px;
      letter-spacing: 0.5px;
      transition: color 0.3s ease, background-color 0.3s ease;

      &:hover {
        color: #ffffff;
        background-color: #000000;
      }
    }
  }
}

.stick {
  font-size: 1.1rem;
  font-weight: 500;
  color: #f0f0f0;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
}

@media (max-width: 768px) {
  .navbar {
    padding: 10px 20px;
  }

  .nav-links {
    margin-top: 10px;

    li {
      margin: 10px 0;
    }
  }
}
</style>
