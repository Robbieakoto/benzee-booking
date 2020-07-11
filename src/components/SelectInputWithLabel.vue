<template>
  <div class="mt-8 flex-shrink w-full inline-block relative">
    <label
      :for="inputName"
      class="block mb-2 leading-none text-gray-800 font-medium"
    >{{ labelName }}</label>
    <select
      aria-label="Type"
      :name="inputName"
      class="form-select shadow-sm block appearance-none text-gray-600 w-full bg-white border border-gray-300 px-4 pr-12 py-3 rounded"
      :required="required"
    >
      <option disabled selected>{{ optionTitle }}</option>
      <option
        v-for="option in options"
        v-bind:key="option.key"
        :value="option.value"
      >{{option.label}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "FlipSelectInputWithLabel",
  props: ["labelName", "inputName", "options", "optionTitle", "required"]
};
</script>