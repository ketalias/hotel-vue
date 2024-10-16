<template>
  <nav class="navbar">
    <div class="logo">
      <h2>Hotel Kilikia</h2>
    </div>
    <ul class="nav-links" :class="{ 'nav-active': isMenuOpen }">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/catalog">Catalog</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  opacity: 70%;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.logo h2 {
  color: white;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #3498db;
}

/* Burger Menu */
.burger {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
}

.burger div {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 10px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .nav-links {
    position: absolute;
    right: 0;
    height: 100vh;
    top: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    transform: translateX(100%);
    transition: transform 0.5s ease;
  }

  .nav-links.nav-active {
    transform: translateX(0%);
  }

  .nav-links li {
    margin: 20px 0;
  }

  .burger {
    display: flex;
  }

  .burger div.line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .burger div.line2 {
    opacity: 0;
  }

  .burger div.line3 {
    transform: rotate(45deg) translate(-5px, -6px);
  }

  .burger-active .line1 {
    transform: rotate(0);
  }

  .burger-active .line2 {
    opacity: 1;
  }

  .burger-active .line3 {
    transform: rotate(0);
  }
}
</style>
