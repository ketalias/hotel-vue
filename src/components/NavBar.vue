<template>
  <nav class="navbar">
    <div class="logo"><img :src="logo" alt="Kilikia Logo" /></div>
    <button
      class="hamburger"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
    >
      <span></span> <span></span> <span></span>
    </button>
    <ul class="nav-links" :class="{ open: isMenuOpen }">
      <li>
        <router-link to="/" @click="toggleMenu">{{
          $t('navbar.home')
        }}</router-link>
      </li>
      <li>
        <router-link to="/catalog" @click="toggleMenu">{{
          $t('navbar.catalog')
        }}</router-link>
      </li>
      <li>
        <router-link to="/contact" @click="toggleMenu">{{
          $t('navbar.contact')
        }}</router-link>
      </li>
      <li class="language-switcher">
        <button @click="changeLanguage('ua')">UA</button>
        <span class="stick">|</span>
        <button @click="changeLanguage('en')">EN</button>
      </li>
      <li>
        <router-link to="/authorize" @click="toggleMenu">
          <font-awesome-icon icon="fa-solid fa-user" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return { logo: require('@/assets/logo.png'), isMenuOpen: false };
  },
  created() {
    this.$i18n.locale = localStorage.getItem('lastLanguage') || 'en';
    if (localStorage.getItem('lastLanguage') !== this.$i18n.locale) {
      localStorage.setItem('lastLanguage', this.$i18n.locale);
    }
    window.addEventListener('storage', () => {
      if (this.$i18n.locale !== localStorage.getItem('lastLanguage')) {
        this.$i18n.locale = localStorage.getItem('lastLanguage');
        this.$router.go();
      }
    });
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('lastLanguage', lang);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
$primary-color: #131313;
$accent-color: #ffffff;
$text-color: #e0e0e0;
$hover-color: #b6870f;
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 30px;
  background: linear-gradient(180deg, $primary-color 0%, #1a1a1a 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: all 0.3s ease;
  &.scrolled {
    background: $primary-color;
    padding: 10px 30px;
  }
  .logo {
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: all 0.4s ease;
    &.open {
      transform: translateY(0);
    }
    li {
      margin: 0 15px;
      position: relative;
      a {
        padding: 12px 16px;
        font-size: 1rem;
        font-weight: 500;
        color: $text-color;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
        border-radius: 8px;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        &:hover {
          color: $accent-color;
          background: rgba($hover-color, 0.1);
          transform: translateY(-2px);
        }
        &.router-link-active {
          color: $hover-color;
          font-weight: 600;
        }
      }
      &.language-switcher {
        display: flex;
        align-items: center;
        gap: 8px;
        button {
          background: none;
          border: none;
          color: $text-color;
          font-size: 0.95rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.3s ease;
          &:hover {
            color: $accent-color;
            background: rgba($hover-color, 0.1);
          }
        }
        .stick {
          color: $text-color;
          font-size: 1rem;
        }
      }
    }
  }
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    span {
      width: 100%;
      height: 3px;
      background: $text-color;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    &.active {
      span {
        &:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }
  @media (max-width: 768px) {
    padding: 12px 20px;
    .hamburger {
      display: flex;
    }
    .nav-links {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 50vw;
      background: $primary-color;
      flex-direction: column;
      align-items: flex-start;
      padding: 80px 20px;
      transform: translateX(100%);
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
      &.open {
        transform: translateX(0);
      }
      li {
        margin: 10px 0;
        width: auto;
        a,
        &.language-switcher button {
          font-size: 1.1rem;
          padding: 12px;
          width: 100%;
          text-align: left;
          border-radius: 6px;
        }
        &.language-switcher {
          flex-direction: row;
          justify-content: flex-start;
          .stick {
            display: inline;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
