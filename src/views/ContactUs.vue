<template>
  <div class="container">
    <div class="title">
      <h1>{{ $t('feedback.title') }}</h1>
    </div>
    <div class="form-container">
      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">{{ $t('feedback.name') }}</label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              :placeholder="$t('feedback.namePlaceholder')"
            />
          </div>

          <div class="form-group">
            <label for="email">{{ $t('feedback.email') }}</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              :placeholder="$t('feedback.emailPlaceholder')"
            />
          </div>

          <div class="form-group">
            <label for="message">{{ $t('feedback.message') }}</label>
            <textarea
              v-model="message"
              id="message"
              required
              :placeholder="$t('feedback.messagePlaceholder')"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">
            {{ $t('feedback.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
  <footer-bottom class="footer"></footer-bottom>
</template>

<script>
import Swal from 'sweetalert2';
import FooterBottom from '@/components/FooterBottom.vue';
export default {
  name: 'ContactUs',
  components: { FooterBottom },
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    submitForm() {
      Swal.fire({
        icon: 'success',
        title: this.$t('feedback.successTitle'),
        text: this.$t('feedback.successMessage'),
        confirmButtonText: this.$t('feedback.okButton'),
      });

      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
}

.form-container {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100vw;
  height: 60vh;
  background-image: url('https://geniusecommerce.com/wp-content/uploads/2019/07/contact-us-bg-3-C.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.title {
  height: auto;
  margin-left: 50px;
  align-content: center;
}

.contact-form {
  width: 40vw;
  margin: auto;
  padding: 15px 30px;
  background-color: rgba(183, 183, 183, 0.8);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .form-group {
    display: flex;
    align-content: center;
    flex-direction: column;
    label {
      display: block;
      margin: 15px 0;
      font-weight: bold;
      font-size: 20px;
      color: #414141;
    }

    input,
    textarea {
      width: auto;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    textarea {
      resize: none;
      height: 100px;
    }
  }
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
