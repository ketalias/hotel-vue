<template>
  <div class="container">
    <div class="login-box">
      <h2>{{ $t('login.title') }}</h2>
      <form @submit.prevent="login">
        <input
          type="email"
          v-model="email"
          :placeholder="$t('login.email')"
          required
        />
        <input
          type="password"
          v-model="password"
          :placeholder="$t('login.password')"
          required
        />
        <div class="options">
          <label>
            <input type="checkbox" v-model="rememberMe" />
            {{ $t('login.rememberMe') }}
          </label>
          <a href="#" @click.prevent="forgotPassword">{{
            $t('login.forgotPassword')
          }}</a>
        </div>
        <button type="submit">{{ $t('login.submit') }}</button>
        <button v-if="isAdmin" @click="logout" class="logout-btn">
          {{ $t('login.logout') }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
  <footer-bottom></footer-bottom>
</template>

<script>
import FooterBottom from '@/components/FooterBottom.vue';

export default {
  name: 'AuthorizeIn',
  components: {
    FooterBottom,
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: null,
      showDialog: false,
    };
  },
  computed: {
    isAdmin() {
      return (
        localStorage.getItem('isAdmin') === 'true' ||
        sessionStorage.getItem('isAdmin') === 'true'
      );
    },
  },
  methods: {
    login() {
      const adminEmail = 'admin@example.com';
      const adminPassword = '123';

      if (this.email === adminEmail && this.password === adminPassword) {
        if (this.rememberMe) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          sessionStorage.setItem('isAdmin', 'true');
        }
      } else {
        this.errorMessage = this.$t('login.invalidCredentials');
      }
    },
    checkAdminAuthorization() {
      localStorage.getItem('isAdmin') || sessionStorage.getItem('isAdmin');
    },
  },
  created() {
    this.checkAdminAuthorization();
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg')
    no-repeat center center fixed;
  background-size: cover;
}

.login-box {
  background-color: rgba(183, 183, 183, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

input[type='email'],
input[type='password'] {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.options {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 14px;
}

button {
  padding: 0.8rem 1.2rem;
  width: 100%;
  border-radius: 5px;
  color: #ffffff;
  background-color: #222222;
  font-size: 1rem;
  font-weight: 800;
  margin-top: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: #866119;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(134, 97, 25, 0.5);
  }
}
</style>
