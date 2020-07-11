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
      <form class="mt-8" action="#">
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
          <flip-button label="Sign in">
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
      </form>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Logo from "../components/Logo";
import FlipButton from "../components/Button";

export default {
  name: "Login",
  components: {
    Logo,
    FlipButton
  }
};
</script>
