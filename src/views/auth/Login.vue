<template>
  <div
    class="home bg-gray-50 h-screen flex items-center justify-center py-20 sm:py-32 md:py-48 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div>
        <logo image-class="mx-auto"></logo>
        <h2
          class="mt-10 text-center text-2xl leading-9 font-extrabold text-gray-900"
        >Sign in to your account</h2>
      </div>

      <div v-if="error" class="mt-2 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex">
          <div class="py-1">
            <svg class="h-6 w-6 text-red-600 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            </div>
          <div>
            <p class="font-bold">Whoops! something went wrong</p>
            <p class="text-sm">{{ error }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm">
          <div>
            <input
              aria-label="Email address"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Email address"
              v-model="credentials.email"
            />
          </div>
          <div class="-mt-px">
            <input
              aria-label="Password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Password"
              v-model="credentials.password"
            />
          </div>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-5">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >Forgot your password?</a>
          </div>
        </div>

        <div class="mt-6">
          <flip-button label="Sign in"  @button-clicked="signIn()">
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </flip-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Logo from "@/components/Logo";
import FlipButton from "@/components/Button";

import { LOGIN_USER } from '@/graphql/queries'
import { onLogin } from '@/vue-apollo'
import { isLoggedIn } from '@/utils/auth'

export default {
  name: "Login",
  metaInfo: {
    title: 'Login'
  },
  components: {
    Logo,
    FlipButton
  },
  apollo: {
    user_login: {
      query: LOGIN_USER,
      error (error) {
        this.error = JSON.stringify(error.message).split(': ')[1]
      },
      // Reactive variables
      variables() {
        return {
          email: this.credentials.email,
          password: this.credentials.password,
        }
      },
      // Disable the query
      skip() {
        return true
      },
    },
  },
  data(){
    return{
      error: null,
      credentials: {
        email: null,
        password: null
      }    
    }
  },
  methods: {
    async signIn() {
      this.error = null
      const { email, password } = this.credentials
      if (!email || !password) {
        this.error = "Please provide an email and password"
        return
      }

      this.$apollo.queries.user_login.skip = false
      try {
        const response  = await this.$apollo.queries.user_login.refetch()

        if (response.data.user_login.success) {
          //set token as cookie
          const token = response.data.user_login.accessToken
          onLogin(this.$apollo.provider.defaultClient, token)

          this.$router.push({ path: '/dashboard' })
        }
      } catch (error) {
        this.$apollo.queries.user_login.skip = true
        console.log('%cError on user login', 'color: orange;', error.message)
      }
      
    }
  },
  mounted() {
    if (isLoggedIn()) {
      this.$router.push({ path: '/dashboard' })
    }
  }
};
</script>
