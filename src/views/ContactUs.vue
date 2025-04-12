<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('feedback.title') }}</h1>
    </header>
    <section class="form-container">
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
              aria-label="Name"
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
              aria-label="Email"
            />
          </div>
          <div class="form-group">
            <label for="message">{{ $t('feedback.message') }}</label>
            <textarea
              v-model="message"
              id="message"
              required
              :placeholder="$t('feedback.messagePlaceholder')"
              aria-label="Message"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            {{ $t('feedback.submit') }}
          </button>
        </form>
      </div>
    </section>
    <footer-bottom class="footer" />
  </div>
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
$primary-bg: #1a1a1a;
$accent-blue: #1e88e5;
$text-color: #e0e0e0;
$secondary-text: #b0b0b0;
$form-bg: rgba(40, 40, 40, 0.95);
.container {
  margin-top: 80px;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $primary-bg;
  .header {
    padding: 20px 0;
    text-align: center;
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: $text-color;
      margin: 0;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.02em;
      transition: color 0.3s ease;
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
  }
  .form-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    background: url('https://sgibenin.com/wp-content/uploads/2016/07/contact-bg-1.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.202);
    }
    .contact-form {
      width: min(90%, 500px);
      padding: 24px;
      background: $form-bg;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.5s ease;
      form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .form-group {
          display: flex;
          flex-direction: column;
          label {
            font-size: 1rem;
            font-weight: 500;
            color: $text-color;
            margin-bottom: 8px;
          }
          input,
          textarea {
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
            border: 1px solid $secondary-text;
            border-radius: 8px;
            background: #333333;
            color: $text-color;
            transition: all 0.3s ease;
            &:focus {
              outline: none;
              border-color: $accent-blue;
              box-shadow: 0 0 0 3px rgba($accent-blue, 0.1);
              background: #3a3a3a;
            }
          }
          textarea {
            min-height: 120px;
            resize: vertical;
          }
        }
        .submit-btn {
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: $accent-blue;
          color: $text-color;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            background: darken($accent-blue, 10%);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          &:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba($accent-blue, 0.3);
          }
          &:active {
            transform: scale(0.98);
          }
        }
      }
    }
  }
  .footer {
    margin-top: auto;
  }
}
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@media (max-width: 600px) {
  .container {
    margin-top: 60px;
    padding: 0 16px;
    .header {
      h1 {
        font-size: 1.8rem;
      }
    }
    .form-container {
      padding: 20px 0;
      .contact-form {
        width: 95%;
        padding: 20px;
        form {
          gap: 16px;
          .form-group {
            label {
              font-size: 0.95rem;
            }
            input,
            textarea {
              font-size: 0.95rem;
              padding: 10px 14px;
            }
          }
          .submit-btn {
            padding: 10px 20px;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}
</style>
