<template>
  <button
    class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
      <slot></slot>
    </span>
    {{ label }}
  </button>
</template>
<script>
export default {
  name: "FlipButton",
  props: ["label"]
};
</script>